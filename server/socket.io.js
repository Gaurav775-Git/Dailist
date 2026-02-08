const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://dailist-beta.vercel.app/",
      methods: ["GET", "POST"],
    },
  });
  


  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendPost", (post) => {
    socket.broadcast.emit("receivePost", post);
    });

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on("leave_chat", (chatId) => {
      socket.leave(chatId);
    });

    socket.on("send_message", (data) => {
      const { chatId, message } = data;
      socket.to(chatId).emit("receive_message", message);
    });

    socket.on("new_post", (newPost) => {
      io.emit("post_added", newPost);
    });

    socket.on("join",(userid)=>{
        socket.join(userid)    
        console.log(userid)  
    })

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
    
  });

  return io; // Export io instance
};

module.exports = configureSocket;
