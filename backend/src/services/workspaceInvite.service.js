//? Importing necessary modules and models.
import WorkspaceInvite from "../models/WorkspaceInvite.model.js";
import Workspace from "../models/Workspace.model.js";
import WorkspaceMember from "../models/WorkspaceMember.model.js";
import User from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.util.js";
import { sendEmail } from "../utils/sendEmail.util.js";
import { workspaceInviteTemplate } from "../utils/email/workspaceInvite.emai.js";
import { INVITATION_STATUS } from "../constants/invitationStatus.constant.js";
import { WORKSPACE_ROLES } from "../constants/workspaceRoles.constant.js";

const twoDays = 48 * 60 * 60 * 1000;

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

//* Service function to create a new workspace invite.
export const createInvite = async ({ workspaceId, email, invitedBy }) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace)
    throw Object.assign(new Error("Workspace not found"), { statusCode: 404 });

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail)
    throw Object.assign(new Error("Invite email is required"), {
      statusCode: 400,
    });

  const exists = await WorkspaceInvite.findOne({
    workspace: workspaceId,
    email: normalizedEmail,
    status: INVITATION_STATUS.PENDING,
  });
  if (exists)
    throw Object.assign(new Error("Invite already pending"), {
      statusCode: 409,
    });

  const token = generateToken(32);
  const invite = await WorkspaceInvite.create({
    workspace: workspaceId,
    email: normalizedEmail,
    invitedBy,
    token,
    expiresAt: new Date(Date.now() + twoDays),
  });

  //* Sending workplace invite email to the invited user.
  const inviteUrl = `${process.env.FRONTEND_URL}/invite/accept?token=${token}`;
  await sendEmail({
    to: normalizedEmail,
    subject: `You're invited to ${workspace.name} - CollabSpace`,
    html: workspaceInviteTemplate({ workspaceName: workspace.name, inviteUrl }),
  });

  return invite;
};

//* Service function to accept a workspace invite.
export const acceptInvite = async ({ token, userId }) => {
  const inv = await WorkspaceInvite.findOne({
    token,
    status: INVITATION_STATUS.PENDING,
  });
  if (!inv)
    throw Object.assign(new Error("Invalid invite"), { statusCode: 400 });
  if (inv.expiresAt < new Date())
    throw Object.assign(new Error("Invite expired"), { statusCode: 400 });

  const user = await User.findById(userId);
  if (!user)
    throw Object.assign(new Error("User not found"), { statusCode: 404 });

  //! Ensure email matches invited email (simple check)
  const invitedEmail = normalizeEmail(inv.email);
  const userEmail = normalizeEmail(user.email);

  if (!invitedEmail || !userEmail || userEmail !== invitedEmail) {
    throw Object.assign(new Error("Invite email mismatch"), {
      statusCode: 403,
      ...(process.env.NODE_ENV === "development"
        ? { meta: { invitedEmail, userEmail } }
        : {}),
    });
  }

  await WorkspaceMember.updateOne(
    { workspace: inv.workspace, user: userId },
    { $setOnInsert: { role: WORKSPACE_ROLES.MEMBER } },
    { upsert: true },
  );

  inv.status = INVITATION_STATUS.ACCEPTED;
  await inv.save();

  return { accepted: true };
};

//* Service function to reject a workspace invite.
export const rejectInvite = async ({ token, userId }) => {
  const inv = await WorkspaceInvite.findOne({
    token,
    status: INVITATION_STATUS.PENDING,
  });
  if (!inv)
    throw Object.assign(new Error("Invalid invite"), { statusCode: 400 });
  const user = await User.findById(userId);
  const invitedEmail = normalizeEmail(inv.email);
  const userEmail = normalizeEmail(user?.email);
  if (!user || !invitedEmail || !userEmail || userEmail !== invitedEmail) {
    throw Object.assign(new Error("Forbidden"), {
      statusCode: 403,
      ...(process.env.NODE_ENV === "development"
        ? { meta: { invitedEmail, userEmail } }
        : {}),
    });
  }

  inv.status = INVITATION_STATUS.REJECTED;
  await inv.save();
  return { rejected: true };
};

//* Service function to list invites of a workspace.
export const listInvites = async (workspaceId) =>
  WorkspaceInvite.find({ workspace: workspaceId });

export const cancelInvite = async (inviteId) => {
  await WorkspaceInvite.updateOne(
    { _id: inviteId },
    { status: INVITATION_STATUS.CANCELLED },
  );
  return { cancelled: true };
};
