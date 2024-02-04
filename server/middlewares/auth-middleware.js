const jwt = require("jsonwebtoken");
const User= require("../models/user-model");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).json( {meaasge : "Token is Note There"});
  }

  
  const jwtToken = token.replace("Bearer " , "").trim();
  console.log("token from auth middleware" , jwtToken);
  try {

      const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
      const userdata = await User.findOne({email : isVerified.email}).select({password:0});
      console.log(userdata);
      req.user = userdata;
      req.token= token;
      req.userID = userdata._id;

      next();
  } catch (error) {
    return res.status(400).json( {meaasge : "Invalid token"});
    
  }
};

module.exports = authMiddleware;
