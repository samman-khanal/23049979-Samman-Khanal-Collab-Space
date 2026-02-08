//? Importing necessary modules and models.
import nodemailer from "nodemailer";

let cachedTransporter = null;
let cachedKey = "";

const computeKey = () =>
  [
    process.env.MAIL_SERVICE,
    process.env.MAIL_HOST,
    process.env.MAIL_PORT,
    process.env.MAIL_SECURE,
    process.env.MAIL_USER,
    Boolean(process.env.MAIL_PASS),
  ].join("|");

export const getMailTransporter = () => {
  const key = computeKey();
  if (cachedTransporter && cachedKey === key) return cachedTransporter;

  const mailService = process.env.MAIL_SERVICE;
  const mailHost = process.env.MAIL_HOST;
  const mailPort = Number(process.env.MAIL_PORT || 587);
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;

  const mailSecure =
    typeof process.env.MAIL_SECURE === "string"
      ? process.env.MAIL_SECURE === "true"
      : mailPort === 465;

  const hasAuth = Boolean(mailUser && mailPass);
  const hasTransportTarget = Boolean(mailService || mailHost);

  cachedKey = key;
  cachedTransporter =
    hasAuth && hasTransportTarget
      ? nodemailer.createTransport(
          mailService
            ? {
                service: mailService,
                auth: { user: mailUser, pass: mailPass },
              }
            : {
                host: mailHost,
                port: mailPort,
                secure: mailSecure,
                auth: { user: mailUser, pass: mailPass },
              },
        )
      : null;

  return cachedTransporter;
};
