const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    try {
        const token=req.cookies.jwt_id;
        
        if(!token){
            console.log("[AUTH] No JWT token found in cookies");
            return res.status(401).json({message:"Unauthorized"})
        }
        
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            console.log("[AUTH] Token verification failed");
            return res.status(401).json({message:"Unauthorized"})
        }
        
        req.user = { id: decode._id };
        console.log("[AUTH] User authenticated:", decode._id);
        next();
        
    } catch (error) {
        console.log("[AUTH] Error:", error.message);
        return res.status(401).json({message:"invalid token"})
    }
}

module.exports=auth