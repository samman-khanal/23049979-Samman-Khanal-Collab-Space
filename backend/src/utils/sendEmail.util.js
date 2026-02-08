//? Importing necessary modules and models.
import { getMailTransporter } from "../config/mail.config.js";

//* Utility function to send an email using the configured mail transporter.
export const sendEmail = async ({ to, subject, html }) => {
  const mailTransporter = getMailTransporter();
  if (!mailTransporter) {
    console.warn(
      "Mail not configured (missing MAIL_HOST/MAIL_SERVICE and/or MAIL_USER/MAIL_PASS). Skipping email send.",
    );
    return { skipped: true };
  }

  try {
    return await mailTransporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.warn("Email send failed:", err?.message || err);
    return { skipped: true, error: err?.message || String(err) };
  }
};
