import http from "http";
import { loadEnv } from "./config/env.config.js";
import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import { initSockets } from "./sockets/index.socket.js";

loadEnv();
await connectDB();

const server = http.createServer(app);
initSockets(server, app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`✅ API running on http://localhost:${PORT}`),
);
