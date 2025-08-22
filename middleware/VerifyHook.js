const crypto = require("crypto");

function verifyWebhook(req, res, next) {
  const secret = process.env.secret;
  const hmac = req.headers["x-shopify-hmac-sha256"];
  const body = JSON.stringify(req.body);

  const hash = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64");

  //   if (hash !== hmac) {
  //     return res.status(401).send("Webhook validation failed");
  //   }
  res.status(200);
  next();
}

module.exports = verifyWebhook;
