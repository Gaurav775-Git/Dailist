const express = require("express");
const router = express.Router();
const senderone = require("../models/user_profile");
const friendreq = require("../models/friends");
const auth = require("../middleware/auth");

module.exports=(io)=>{
  router.post("/send-request", auth, async (req, res) => {
  try {
    const senderid = req.user.id;
    const receiverid = req.body.to;

    if (!senderid || !receiverid) {
      return res.status(400).json({
        message: "sender or receiver id missing",
      });
    }

    await friendreq.create({
      from: senderid,
      to: receiverid,
      status: "pending",
    });

    const senderinfo = await senderone.findOne({
      user_id: senderid,
    });

    io.to(receiverid).emit("friend_request", {
      senderinfo: [senderinfo],
    });
    console.log(senderinfo)
    
    res.json({
      message: "Friend request sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

return router
}



