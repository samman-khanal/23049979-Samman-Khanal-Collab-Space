import Channel from "../models/Channel.model.js";
import WorkspaceMember from "../models/WorkspaceMember.model.js";

export const createChannel = async ({
  workspaceId,
  name,
  type = "public",
  userId,
}) => {
  // must be workspace member
  const wsMember = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: userId,
  });
  if (!wsMember)
    throw Object.assign(new Error("Not a workspace member"), {
      statusCode: 403,
    });

  // creator always in members
  return Channel.create({
    workspace: workspaceId,
    name,
    type,
    createdBy: userId,
    members: [userId],
  });
};

export const listChannels = async ({ workspaceId, userId }) => {
  // Must be workspace member
  const wsMember = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: userId,
  });
  if (!wsMember)
    throw Object.assign(new Error("Not a workspace member"), {
      statusCode: 403,
    });

  // For private channels, only return ones the user is a member of
  return Channel.find({
    workspace: workspaceId,
    $or: [{ type: "public" }, { members: userId }],
  }).sort({ createdAt: -1 });
};

export const addMembersToChannel = async ({ channelId, userIds }) => {
  return Channel.findByIdAndUpdate(
    channelId,
    { $addToSet: { members: { $each: userIds } } },
    { new: true },
  );
};

export const joinChannel = async ({ channelId, userId }) => {
  const channel = await Channel.findById(channelId);
  if (!channel)
    throw Object.assign(new Error("Channel not found"), { statusCode: 404 });

  // Must be workspace member
  const wsMember = await WorkspaceMember.findOne({
    workspace: channel.workspace,
    user: userId,
  });
  if (!wsMember)
    throw Object.assign(new Error("Not a workspace member"), {
      statusCode: 403,
    });

  // Private channels: no open join
  if (channel.type === "private")
    throw Object.assign(new Error("Private channel: invite required"), {
      statusCode: 403,
    });

  return Channel.findByIdAndUpdate(
    channelId,
    { $addToSet: { members: userId } },
    { new: true },
  );
};

export const leaveChannel = async ({ channelId, userId }) =>
  Channel.findByIdAndUpdate(
    channelId,
    { $pull: { members: userId } },
    { new: true },
  );
