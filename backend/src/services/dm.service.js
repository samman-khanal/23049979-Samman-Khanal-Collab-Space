import DMConversation from "../models/DMConversation.model.js";
import WorkspaceMember from "../models/WorkspaceMember.model.js";

const sortedPair = (a, b) => [String(a), String(b)].sort();

export const createOrGetDM = async ({ workspaceId, userId, otherUserId }) => {
  // both must be workspace members
  const [m1, m2] = await Promise.all([
    WorkspaceMember.findOne({ workspace: workspaceId, user: userId }),
    WorkspaceMember.findOne({ workspace: workspaceId, user: otherUserId }),
  ]);
  if (!m1 || !m2)
    throw Object.assign(new Error("Both users must be workspace members"), {
      statusCode: 403,
    });

  const participants = sortedPair(userId, otherUserId);

  const existing = await DMConversation.findOne({
    workspace: workspaceId,
    participants,
  });
  if (existing) return existing;

  return DMConversation.create({ workspace: workspaceId, participants });
};

export const listMyDMs = async ({ workspaceId, userId }) => {
  // workspace member required
  const wsMember = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: userId,
  });
  if (!wsMember)
    throw Object.assign(new Error("Not a workspace member"), {
      statusCode: 403,
    });

  return DMConversation.find({
    workspace: workspaceId,
    participants: userId,
  }).sort({ updatedAt: -1 });
};
