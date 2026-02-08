import { Server } from "socket.io";
import { corsOptions } from "../config/cors.config.js";
import { verifyToken } from "../utils/jwt.util.js";
import { APP_EVENTS } from "../constants/appEvents.constant.js";

export const initSockets = (httpServer, app) => {
  const io = new Server(httpServer, { cors: corsOptions });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("No token"));
      const decoded = verifyToken(token);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // user room for notifications
    socket.join(`user:${socket.userId}`);

    // join/leave channel rooms
    socket.on(APP_EVENTS.CHANNEL_JOIN, (channelId) =>
      socket.join(`channel:${channelId}`),
    );
    socket.on(APP_EVENTS.CHANNEL_LEAVE, (channelId) =>
      socket.leave(`channel:${channelId}`),
    );

    // join/leave dm rooms
    socket.on(APP_EVENTS.DM_JOIN, (dmId) => socket.join(`dm:${dmId}`));
    socket.on(APP_EVENTS.DM_LEAVE, (dmId) => socket.leave(`dm:${dmId}`));
  });

  app.set("io", io);
  console.log("Socket.IO ready (JWT auth enabled)");
  return io;
};
