// import jwt from "jsonwebtoken";
// const isAuthenticated=async(req,res,next)=>{
//     try{
//         const token=req.cookies.token;
//         if(!token){
//             return res.status(401).json({
//                 message:"You are not authenticated",
//                 success:false
//             });
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:"You are not authenticated",
//                 success:false
//             });

//         };
//         req.id=decode.userId;
//         next();
      
//     }catch(error)
//     {
//       console.log(error);
//     }

// }
// export default isAuthenticated;

import jwt from "jsonwebtoken";


const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "You are not authenticated (no token)",
        success: false
      });
    }

    // No need to `await` jwt.verify, it's synchronous
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decoded.userId;
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false
    });
  }
};

export default isAuthenticated;
