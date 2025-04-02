require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("taskUpdated", () => {
    io.emit("refreshTasks");
  });
});

// ✅ ADD THIS ROUTE to prevent "Cannot GET /" error
app.get("/", (req, res) => {
  res.send("Welcome to the Kanban Board API!");
});

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
