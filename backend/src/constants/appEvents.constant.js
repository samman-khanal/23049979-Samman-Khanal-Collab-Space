//* Constants representing different application events for real-time updates.
export const APP_EVENTS = {
  BOARD_JOIN: "board:join",
  BOARD_LEAVE: "board:leave",
  TASK_UPDATED: "task:updated",
  TASK_MOVED: "task:moved",
  MESSAGE_NEW: "message:new",

  //* Chat rooms
  CHANNEL_JOIN: "channel:join",
  CHANNEL_LEAVE: "channel:leave",
  DM_JOIN: "dm:join",
  DM_LEAVE: "dm:leave",

  //* Channel messages
  CHANNEL_MESSAGE_NEW: "channel:message:new",
  CHANNEL_MESSAGE_EDITED: "channel:message:edited",
  CHANNEL_MESSAGE_DELETED: "channel:message:deleted",
  CHANNEL_MESSAGE_REACTED: "channel:message:reacted",

  //* DM messages
  DM_MESSAGE_NEW: "dm:message:new",
  DM_MESSAGE_EDITED: "dm:message:edited",
  DM_MESSAGE_DELETED: "dm:message:deleted",
  DM_MESSAGE_REACTED: "dm:message:reacted",

  //* Notifications
  NOTIFICATION_NEW: "notification:new",
};
