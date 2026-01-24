const express=require("express")
const router=express.Router()
const userpost=require("../models/userpost")
const auth=require("../middleware/auth")

router.get("/getuserpost",auth,async(req,res)=>{

    try {
        
        const post =await userpost.find()
                .populate("userpost_id")
                .sort({createdAt:-1})

        if(!post){
            return res.status(400).json({message:"post not found"})
        }

        res.status(200).json({
            success:true,
            post
        });
        
    } catch (error) {

        console.log(error,"user not get")
        res.status(500).json({message:"user not get go and create account"})
        
    }

})

module.exports=router