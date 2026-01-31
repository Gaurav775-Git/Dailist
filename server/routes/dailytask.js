const express= require("express")
const router=express.Router()
const userprofile=require("../models/user_profile")
const userdailytask=require("../models/Dailytask")
const auth= require("../middleware/auth")
const analyze_task= require("../middleware/ai_analyze")




router.post("/upload_task", auth, async (req, res) => {
  try {
    const {task} = req.body;
    const user_id = req.userId;

    const tasks = Object.values(task)
      .map(t => t.trim())
      .filter(t => t !== "");


    if (tasks.length === 0) {
      return res.status(400).json({ msg: "No tasks provided" });
    }

    const ai_decision = await analyze_task(tasks);

    console.log("AI Response: done");

    let today=new Date()
    today.setHours(0,0,0,0)

    let dailydoc= await userdailytask.findOne({
        user:user_id,
        date:today
    })

    if(dailydoc){
        dailydoc.tasks.push(...ai_decision)
        await dailydoc.save()
    } else {
        await userdailytask.create({
            user:user_id,
            date:today,
            tasks:ai_decision
        })
    }
     
    res.status(200).json({message:"tasks saved successfully"})


  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports=router