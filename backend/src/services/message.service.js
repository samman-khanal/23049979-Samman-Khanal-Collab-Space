import Message from "../models/Message.model.js";
import Channel from "../models/Channel.model.js";
import User from "../models/User.model.js";
import { extractMentionEmails } from "../utils/extractMentions.util.js";
import { createNotification } from "./notification.service.js";
import { APP_EVENTS } from "../constants/appEvents.constant.js";

export const sendChannelMessage = async ({
  channelId,
  senderId,
  content,
  file,
  io,
}) => {
  const channel = await Channel.findById(channelId);
  if (!channel)
    throw Object.assign(new Error("Channel not found"), { statusCode: 404 });

  // must be channel member
  const isMember = channel.members.some(
    (id) => String(id) === String(senderId),
  );
  if (!isMember)
    throw Object.assign(new Error("Not a channel member"), { statusCode: 403 });

  const attachments = [];
  if (file) {
    attachments.push({
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      dataBase64: file.buffer.toString("base64"),
    });
  }

  const msg = await Message.create({
    channel: channelId,
    dm: null,
    sender: senderId,
    content: content || "",
    attachments,
  });

  // Mentions -> notifications
  const emails = extractMentionEmails(msg.content);
  if (emails.length) {
    const mentionedUsers = await User.find({ email: { $in: emails } }).select(
      "_id email",
    );
    await Promise.all(
      mentionedUsers.map((u) =>
        createNotification({
          userId: u._id,
          type: "mention",
          message: "You were mentioned in a channel message",
          meta: { channelId, messageId: msg._id },
          io,
        }),
      ),
    );
  }

  // emit to channel room
  if (io)
    io.to(`channel:${String(channelId)}`).emit(
      APP_EVENTS.CHANNEL_MESSAGE_NEW,
      msg,
    );

  return msg;
};

export const listChannelMessages = async ({
  channelId,
  userId,
  limit = 50,
}) => {
  const channel = await Channel.findById(channelId);
  if (!channel)
    throw Object.assign(new Error("Channel not found"), { statusCode: 404 });

  const isMember = channel.members.some((id) => String(id) === String(userId));
  if (!isMember)
    throw Object.assign(new Error("Not a channel member"), { statusCode: 403 });

  return Message.find({ channel: channelId, deletedAt: null })
    .populate("sender", "fullName email avatarUrl")
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit) || 50, 200));
};

export const editMessage = async ({ messageId, userId, newContent, io }) => {
  const msg = await Message.findById(messageId);
  if (!msg)
    throw Object.assign(new Error("Message not found"), { statusCode: 404 });
  if (String(msg.sender) !== String(userId))
    throw Object.assign(new Error("Forbidden"), { statusCode: 403 });
  if (msg.deletedAt)
    throw Object.assign(new Error("Message deleted"), { statusCode: 400 });

  msg.content = newContent;
  msg.editedAt = new Date();
  await msg.save();

  if (io) {
    if (msg.channel)
      io.to(`channel:${String(msg.channel)}`).emit(
        APP_EVENTS.CHANNEL_MESSAGE_EDITED,
        msg,
      );
    if (msg.dm)
      io.to(`dm:${String(msg.dm)}`).emit(APP_EVENTS.DM_MESSAGE_EDITED, msg);
  }

  return msg;
};

export const deleteMessage = async ({ messageId, userId, io }) => {
  const msg = await Message.findById(messageId);
  if (!msg)
    throw Object.assign(new Error("Message not found"), { statusCode: 404 });
  if (String(msg.sender) !== String(userId))
    throw Object.assign(new Error("Forbidden"), { statusCode: 403 });

  msg.deletedAt = new Date();
  await msg.save();

  if (io) {
    if (msg.channel)
      io.to(`channel:${String(msg.channel)}`).emit(
        APP_EVENTS.CHANNEL_MESSAGE_DELETED,
        { _id: msg._id },
      );
    if (msg.dm)
      io.to(`dm:${String(msg.dm)}`).emit(APP_EVENTS.DM_MESSAGE_DELETED, {
        _id: msg._id,
      });
  }

  return { deleted: true };
};

export const toggleReaction = async ({ messageId, userId, emoji, io }) => {
  const msg = await Message.findById(messageId);
  if (!msg)
    throw Object.assign(new Error("Message not found"), { statusCode: 404 });
  if (msg.deletedAt)
    throw Object.assign(new Error("Message deleted"), { statusCode: 400 });

  const idx = msg.reactions.findIndex(
    (r) => r.emoji === emoji && String(r.user) === String(userId),
  );
  if (idx >= 0) msg.reactions.splice(idx, 1);
  else msg.reactions.push({ emoji, user: userId });

  await msg.save();

  if (io) {
    if (msg.channel)
      io.to(`channel:${String(msg.channel)}`).emit(
        APP_EVENTS.CHANNEL_MESSAGE_REACTED,
        msg,
      );
    if (msg.dm)
      io.to(`dm:${String(msg.dm)}`).emit(APP_EVENTS.DM_MESSAGE_REACTED, msg);
  }

  return msg;
};

//TODO

// import Message from "../models/Message.model.js";
import DMConversation from "../models/DMConversation.model.js";
// import User from "../models/User.model.js";
// import { createNotification } from "./notification.service.js";
// import { APP_EVENTS } from "../constants/appEvents.js";

// ✅ Send message to DM (with optional file)
export const sendDMMessage = async ({ dmId, senderId, content, file, io }) => {
  const dm = await DMConversation.findById(dmId);
  if (!dm) throw Object.assign(new Error("DM not found"), { statusCode: 404 });

  const isParticipant = dm.participants.some(
    (id) => String(id) === String(senderId),
  );
  if (!isParticipant)
    throw Object.assign(new Error("Not a DM participant"), { statusCode: 403 });

  const attachments = [];
  if (file) {
    attachments.push({
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      dataBase64: file.buffer.toString("base64"),
    });
  }

  const msg = await Message.create({
    dm: dmId,
    channel: null,
    sender: senderId,
    content: content || "",
    attachments,
  });

  // ✅ Notify the other participant
  const otherUserId = dm.participants.find(
    (id) => String(id) !== String(senderId),
  );
  if (otherUserId) {
    await createNotification({
      userId: otherUserId,
      type: "dm_message",
      message: "New direct message",
      meta: { dmId, messageId: msg._id },
      io,
    });
  }

  // ✅ Emit to DM room
  if (io) io.to(`dm:${String(dmId)}`).emit(APP_EVENTS.DM_MESSAGE_NEW, msg);

  return msg;
};

// ✅ List DM messages
export const listDMMessages = async ({ dmId, userId, limit = 50 }) => {
  const dm = await DMConversation.findById(dmId);
  if (!dm) throw Object.assign(new Error("DM not found"), { statusCode: 404 });

  const isParticipant = dm.participants.some(
    (id) => String(id) === String(userId),
  );
  if (!isParticipant)
    throw Object.assign(new Error("Not a DM participant"), { statusCode: 403 });

  return Message.find({ dm: dmId, deletedAt: null })
    .populate("sender", "fullName email avatarUrl")
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit) || 50, 200));
};
