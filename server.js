// import { connectDb } from "./app/lib/mongodb.js";
// import { Server } from "socket.io";

// const io = new Server(3001, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("orders", (orderData) => {
//     console.log("Order received:", orderData);
//     io.emit("orders", orderData);
//   });

//   socket.on("cashierMessage", (cashierMessage) => {
//     console.log("Message received:", cashierMessage);
//     io.emit("cashierMessage", cashierMessage);
//   });

//   socket.on("chatMessage", (message) => {
//     console.log("Chat message received:", message);
//     io.emit("chatMessage", message);
//   });

//   socket.on("dailySales", (data) => {
//     console.log(`Sales data received from ${data.username}:`, data);
//     io.emit("cashierGroup", {
//       username: data.username,
//       sales: data.sales,
//       totalSales: data.totalSales,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// (async () => {
//   try {
//     await connectDb();
//     console.log("Mongoose connection successful!");
//   } catch (error) {
//     console.error("Connection failed:", error);
//   }
// })();


const { connectDb } = require("./app/lib/mongodb");
const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("orders", (orderData) => {
    console.log("Order received:", orderData);
    io.emit("orders", orderData);
  });

  socket.on("cashierMessage", (cashierMessage) => {
    console.log("Message received:", cashierMessage);
    io.emit("cashierMessage", cashierMessage);
  });

  socket.on("chatMessage", (message) => {
    console.log("Chat message received:", message);
    io.emit("chatMessage", message);
  });

  socket.on("dailySales", (data) => {
    console.log(`Sales data received from ${data.username}:`, data);
    io.emit("cashierGroup", {
      username: data.username,
      sales: data.sales,
      totalSales: data.totalSales,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

(async () => {
  try {
    await connectDb();
    console.log("Mongoose connection successful!");
  } catch (error) {
    console.error("Connection failed:", error);
  }
})();
