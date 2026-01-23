const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    try {
        const token=req.cookies.jwt_id;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.userId=decode._id;
        next();
        
        
    } catch (error) {
        console.log(error,"you are not authorized");
    }
}

module.exports=auth