const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { prisma } = require("./context");
const crypto = require("crypto");
const verifyWebhook = require("./middleware/VerifyHook");
const sendEmail = require("./helpers/emailService");
const mailTemplate = require("./helpers/mailtemplate");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/create-card", async (req, res) => {
  const { type, value, code } = req.body;
  try {
    const card = await prisma.giftCard.create({
      data: {
        type,
        value,
        code,
      },
    });
    return res.send(card);
  } catch (error) {
    res.error({ message: error.message });
  }
});

// app.post("/webhook", verifyWebhook, async (req, res) => {
//   try {
//     const { id, email, line_items } = req.body;
//     console.log(email);
//     for (let item of line_items) {
//       const data = item.variant_title.split("-");
//       const code = data[0];
//       const amount = data[1];

//       const checkexistance = await prisma.cardPurchases.findFirst({
//         where: {
//           AND: {
//             order_id: id,
//           },
//         },
//       });

//       if (!checkexistance) {
//         await prisma.cardPurchases.create({
//           data: {
//             card_type: code,
//             email,
//             order_id: item.id,
//             quantity: item?.quantity,
//           },
//         });
//         for (let i = 1; i <= item?.quantity; i++) {
//           const giftCard = await prisma.giftCard.findFirst({
//             where: {
//               AND: {
//                 type: code,
//                 value: Number(amount),
//                 isUsed: false,
//               },
//             },
//           });

//           if (!giftCard) {
//             console.log("card assa");
//             return res.status(200);
//           }

//           const mailData = {
//             card_code: giftCard?.code,
//             card_value: giftCard?.value,
//             card_type: giftCard?.type,
//           };

//           await sendEmail(mailTemplate(mailData), email, "Card Purchase");

//           console.log("card Sent");

//           await prisma.giftCard.update({
//             where: {
//               id: giftCard.id,
//             },
//             data: {
//               sentTo: email,
//               isUsed: true,
//             },
//           });

//           return res.send("success").status(200);
//         }
//       }
//       console.log("already captured");
//       return res.send("already").status(200);
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("Something went wrong");
//   }
// });

app.post("/webhook", verifyWebhook, async (req, res) => {
  try {
    const { id: orderId, email, line_items } = req.body;

    // Log email for debugging
    console.log(`Processing webhook for email: ${email}`);

    // Check if this order has already been processed
    const existingPurchase = await prisma.cardPurchases.findFirst({
      where: { order_id: orderId },
    });

    if (existingPurchase) {
      console.log("Order already processed");
      return res.status(200).send("Order already processed");
    }

    // Loop through line items and process each one
    for (let item of line_items) {
      const [cardType, amount] = item.variant_title.split("-");
      const quantity = item.quantity;

      // Save the card purchase details
      const cardPurchase = await prisma.cardPurchases.create({
        data: {
          card_type: cardType,
          email,
          order_id: orderId,
          quantity,
        },
      });

      // Fetch available gift cards for this item
      const availableCards = await prisma.giftCard.findMany({
        where: {
          type: cardType,
          value: Number(amount),
          isUsed: false,
        },
        take: quantity, // Fetch only the required number of cards
      });

      // Check if sufficient cards are available
      if (availableCards.length < quantity) {
        console.log("Insufficient gift cards available");
        await prisma.cardPurchases.update({
          where: {
            id: cardPurchase.id,
          },
          data: {
            status: "FAILED",
          },
        });
        return res.status(200).send("Insufficient gift cards available");
      }

      // Process and send gift cards
      for (let i = 0; i < quantity; i++) {
        const giftCard = availableCards[i];

        const mailData = {
          card_code: giftCard.code,
          card_value: giftCard.value,
          card_type: giftCard.type,
        };

        // Send email
        await sendEmail(mailTemplate(mailData), email, "Card Purchase");
        console.log(`Gift card sent: ${giftCard.code}`);

        // Mark card as used
        await prisma.giftCard.update({
          where: { id: giftCard.id },
          data: {
            sentTo: email,
            isUsed: true,
          },
        });

        await prisma.cardPurchases.update({
          where: {
            id: cardPurchase.id,
          },
          data: {
            status: "SUCCESS",
          },
        });
      }
    }

    console.log("All items processed successfully");
    return res.status(200).send("Success");
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => console.log("Webhook server running on port 3000"));
