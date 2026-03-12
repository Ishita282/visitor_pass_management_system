const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (to, message) => {
  return client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    .then((msg) => console.log("SMS sent:", msg.sid))
    .catch((err) => console.error("SMS error:", err));
};

module.exports = sendSMS;