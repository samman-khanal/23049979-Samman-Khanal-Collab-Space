//* Utility function to generate the HTML content for an email verification message.
export const verifyEmailTemplate = ({ name, verifyUrl }) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6">
    <p>Hi ${name || "there"},</p>
    <p>Please verify your email for CollabSpace by clicking below:</p>
    <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Verify Email</a></p>
    <p>If you didn't sign up, ignore this email.</p>
  </div>
`;
