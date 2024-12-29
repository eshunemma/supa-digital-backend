const mailTemplate = (emailData) => {
  const { card_value, card_type, card_code } = emailData;
  return `
    <!DOCTYPE html>
<html>
<head>
  <style>
    /* Ensure proper rendering and touch zooming */
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header Section -->
          <tr>
            <td align="center" style="background-color: #007bff; padding: 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Your Digital Gift Card</h1>
            </td>
          </tr>
          <!-- Body Section -->
          <tr>
            <td style="padding: 20px; text-align: left; color: #333333;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
                Thank you for your purchase! Below are the details of your digital gift card:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 4px;">
                <tr>
                  <td style="padding: 10px; font-size: 14px; color: #555555;">Card Type:</td>
                  <td style="padding: 10px; font-size: 14px; color: #333333;"><strong>${card_type}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-size: 14px; color: #555555;">Card Value:</td>
                  <td style="padding: 10px; font-size: 14px; color: #333333;"><strong>${card_value}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-size: 14px; color: #555555;">Card Code:</td>
                  <td style="padding: 10px; font-size: 14px; color: #333333;"><strong>${card_code}</strong></td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
                If you have any questions, feel free to reach out to our support team.
              </p>
              <p style="margin: 0; font-size: 16px; line-height: 1.5;">Thank you for choosing us!</p>
            </td>
          </tr>
          <!-- Footer Section -->
          <tr>
            <td align="center" style="background-color: #f4f4f4; padding: 20px; font-size: 12px; color: #777777;">
              <p style="margin: 0;">&copy; 2024 Supa Digital Hub. All rights reserved.</p>
              <a style="margin: 0;" href="https://api.whatsapp.com/send?phone=233541210460&text=Describe%20your%20issue">What's App Us</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
};

module.exports = mailTemplate;
