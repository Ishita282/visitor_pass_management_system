const sendEmail = require("../notification/sendEmail");
const sendSMS = require("../notification/sendSMS");

exports.appointmentApproved = async (email, name, date, phone) => {
  const subject = "Appointment Approved";

  const text = `
Hello ${name},

Your appointment has been APPROVED.

Appointment Date: ${date}

Please bring your visitor pass when arriving.

Thank you.
`;

  await sendEmail(email, subject, text);
  if (phone) await sendSMS(phone, text);
};

exports.appointmentRejected = async (email, name, phone) => {
  const subject = "Appointment Rejected";

  const text = `
Hello ${name},

Unfortunately your appointment request was rejected.

Please contact the host for more details.

Thank you.
`;

  await sendEmail(email, subject, text);
  if (phone) await sendSMS(phone, text);
};

exports.passGenerated = async (email, name, passId, phone) => {
  const subject = "Visitor Pass Generated";

  const text = `
Hello ${name},

Your visitor pass has been generated.

Pass ID: ${passId}

Please show this pass at the security desk.

Thank you.
`;

  await sendEmail(email, subject, text);
  if (phone) await sendSMS(phone, text);
};
