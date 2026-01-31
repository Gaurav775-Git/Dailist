const express=require('express')
const router= express.Router()
const userpost=require("../models/userpost")
const auth=require("../middleware/auth")

module.exports = (io) => {
  router.post("/userpost",auth,async(req,res)=>{
      try {

        const {text}=req.body
      if(!text){
          return res.status(400).json({message:"text is required"})
        }
       const savedpost= await userpost.create({
          userpost_id:req.user.id,
          text:text
        })
        const fullpost= await savedpost.populate("userpost_id")
        io.emit('post_added', fullpost); // Emit new post event
         res.status(200).json({message:"post created",fullpost})


      } catch (error) {
          console.log(error,"post creation failed")
          res.status(500).json({message:"Unable to create post"})
      }

  })
  return router;
}