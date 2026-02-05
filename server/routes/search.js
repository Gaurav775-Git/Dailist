const  express= require("express")
const router=express.Router()
const user= require("../models/user_account")
const auth=require("../middleware/auth")

router.get("/search-users",auth,async (req,res)=>{
    try {
        const  username=req.query.q;
     
    if(!username){
        return res.status(500).json({message:"user not found"})
    }

    const users= await user.find({
        name: {$regex:username, $options: "i"}

    }).select("-password -email -phone")

    return res.status(200).json(users)

        
    } catch (error) {
        console.error(err);
        return res.status(500).json({message:"server error"})
    }
})




module.exports=router