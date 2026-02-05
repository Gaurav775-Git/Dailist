const express=require("express")
const router=express.Router()
const friendreq= require("../models/friends")
const  auth =require("../middleware/auth")

router.post("/send-request",auth,(req,res)=>{

    const auth_req_user=req.user.id

    const  reciver_req_user=req.body.to

    console.log(auth_req_user)
    console.log(reciver_req_user)



})

module.exports=router