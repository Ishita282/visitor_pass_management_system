const sendEmail = require("../config/sendEmail");

exports.appointmentApproved = async (visitorEmail, visitorName, date) => {
  const subject = "Appointment Approved";

  const text = `
Hello ${visitorName},

Your appointment has been APPROVED.

Appointment Date: ${date}

Please bring your visitor pass when arriving.

Thank you.
`;

  await sendEmail(visitorEmail, subject, text);
};

exports.appointmentRejected = async (visitorEmail, visitorName) => {
  const subject = "Appointment Rejected";

  const text = `
Hello ${visitorName},

Unfortunately your appointment request was rejected.

Please contact the host for more details.

Thank you.
`;

  await sendEmail(visitorEmail, subject, text);
};

exports.passGenerated = async (visitorEmail, visitorName, passId) => {
  const subject = "Visitor Pass Generated";

  const text = `
Hello ${visitorName},

Your visitor pass has been generated.

Pass ID: ${passId}

Please show this pass at the security desk.

Thank you.
`;

  await sendEmail(visitorEmail, subject, text);
};