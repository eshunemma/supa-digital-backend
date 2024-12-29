const crypto = require("crypto");

function verifyWebhook(req, res, next) {
  const secret = "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";
  //   const secret = "5d8efd0d907bd6c5a2de2fb1e6a37f2c";
  //   const secret = "5d8efd0d907bd6c5a2de2fb1e6a37f2c";
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
