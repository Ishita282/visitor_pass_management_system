const sendEmail = require("../notification/sendEmail");
const sendSMS = require("../notification/sendSMS");

const isValidPhone = (phone) => {
  return phone;
};

const isValidEmail = (email) => {
  return email;
};

exports.appointmentApproved = async (email, phone, name, date, qrCode) => {
  const subject = "Appointment Approved";
  const message = `
    ${subject}
Hello ${name},
Your appointment has been APPROVED.
Appointment Date: ${date}
Please bring your visitor pass when you arrive.
You can also scan this QR code for quick access:
${qrCode}
Thank you.
`;

  if (isValidPhone(phone)) {
    await sendSMS(phone, message);
  }
  if (isValidEmail(email)) {
    await sendEmail(email, message);
  }
};

exports.appointmentRejected = async (email, phone, name) => {
  const subject = "Appointment Rejected";
  const message = `
    ${subject}
Hello ${name},
Your appointment request was rejected.
Please contact the host for more information.
Thank you.
`;
  if (isValidEmail(email)) {
    await sendEmail(email, message);
  }
  if (isValidPhone(phone)) {
    await sendSMS(phone, message);
  }
};

exports.passGenerated = async (email, phone, name, passId, qrCode) => {
  const subject = "Visitor Pass Generated";
  const message = `
  ${subject}
Hello ${name},
Your visitor pass has been generated.
Pass ID: ${passId}
Please show this pass at the security desk.
You can scan this QR code to access your pass:
${qrCode}
Thank you.
`;
  if (isValidEmail(email)) {
    await sendEmail(email, message);
  }
  if (isValidPhone(phone)) {
    await sendSMS(phone, message);
  }
};
