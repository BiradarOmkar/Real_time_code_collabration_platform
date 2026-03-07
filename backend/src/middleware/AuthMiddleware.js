import jwt from 'jsonwebtoken'

 export  const verify_token=(req,res,next)=>{
     let token=req.cookies.token;

         if(!token){
           return   res.status(401).json({message:"No token Found Access deined"})
         }
         try{
            console.log("hello");
            
            //    decode the jwt token
            const decode=jwt.verify(token,"sdmvbsfbsf")
            req.user=decode
            console.log("Decoded user",req.user);
            next();
         }catch(e){
            return res.status(500).json({message:"Token Invalid"})
         }
      
    }
  export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access forbidden: insufficient role"
      });
    }
    next();
  };
};