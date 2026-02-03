const express = require("express");
const router = express.Router();
const dailytask = require("../models/Dailytask");
const auth = require("../middleware/auth");

router.get("/get_task", auth, async (req, res) => {
  try {
    const user_id = req.user.id;

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskdoc = await dailytask.findOne({
      user: user_id,
      date: today,
    });

    if (!taskdoc) {
      return res.status(200).json({ tasks: [] 
      }); 
    }

    return res.status(200).json({ tasks: taskdoc.tasks ,
        date:taskdoc.date,
    }); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
