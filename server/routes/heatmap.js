const express = require("express");
const router = express.Router();
const dailytask = require("../models/Dailytask");
const auth = require("../middleware/auth");
const mongoose =require("mongoose")
router.get("/heatmap", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await dailytask.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          date: 1,
          totalPoints: {
            $sum: {
              $map: {
                input: "$tasks",
                as: "task",
                in: {
                  $cond: ["$$task.completed", "$$task.points", 0]
                }
              }
            }
          }
        }
      }
    ]);

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Heatmap data error" });
  }
});


module.exports = router;
