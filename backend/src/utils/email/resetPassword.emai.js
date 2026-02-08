//* Utility function to generate the HTML content for a password reset email.
export const resetPasswordTemplate = ({ resetUrl }) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6">
    <p>Click the button below to reset your password:</p>
    <p><a href="${resetUrl}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Reset Password</a></p>
    <p>If you didn’t request this, ignore this email.</p>
  </div>
`;
