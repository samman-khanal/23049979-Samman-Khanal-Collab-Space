//* Utility function to generate the HTML content for a workspace invitation email.
export const workspaceInviteTemplate = ({ workspaceName, inviteUrl }) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6">
    <p>You have been invited to join <b>${workspaceName}</b> on CollabSpace.</p>
    <p><a href="${inviteUrl}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Accept Invite</a></p>
  </div>
`;
