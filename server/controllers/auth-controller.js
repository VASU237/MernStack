const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcom to home Page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try { 
    const { username, email, phone, password } = req.body;
    console.log(req.body);

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res
      .status(201)
      .json({
        msg: "Registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });

    // console.log(req.body);
    // res.status(200).json({message : req.body })

  } catch (error) {
    console.log(req.body);
    res.status(500).json({message : " Internal Server error" })
  }
};

const login = async (req,res) =>{
  try {
    const {email,password}=req.body;
    const userExist = await User.findOne({email});
    if(!userExist){
       return res.status(400).json({message : " Invalid credentaials "})
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);


    if(user){
      res
      .status(201)
      .json({
        msg: "Login Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }else{
      res.status(401).json({message:"Inavalid Email or Password"});
    }


  } catch (error) {
    res.status(500).json({message : " Internal Server "})

  }
}

const user = async (req,res) =>{
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({msg : userData});
  } catch (error) {
    console.log("Error From user Route");
  }
}

module.exports = { home, register , login , user};
