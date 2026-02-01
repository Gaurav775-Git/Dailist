const express = require("express");
const router = express.Router();
const userdailytask = require("../models/Dailytask");
const userscore = require("../models/userscore");
const auth = require("../middleware/auth");

router.post("/complete_task", auth, async (req, res) => {
  try {
    const { taskid, taskpoint } = req.body;
    const user_id = req.user.id;
console.log(taskid,taskpoint)
    await userdailytask.updateOne(
      { user: user_id, "tasks._id": taskid },
      {
        $set: {
          "tasks.$.completed": true,
          "tasks.$.completedAt": new Date(),
        },
      },
    );

    const updatescore = await userscore.findOneAndUpdate(
      { user: user_id },
      { $inc: { score: taskpoint } },
      { new: true, upsert: true },
    );

    res
      .status(200)
      .json({ message: "taskcompleted", newscore: updatescore.score });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error" });
  }
});
module.exports = router;
