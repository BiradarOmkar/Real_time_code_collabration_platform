import user_model from "../models/User_model.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { email, password, user_name ,role} = req.body;
    if (email == null || password == null || user_name == null) {
      return res.status(400).json({ message: "Feilds are empty" });
    }
    console.log(req.body);
    // check if email already exist
    const find_user = await user_model.findOne({ email });
    if (find_user) {
      return res.status(401).json({ message: "user already Exist" });
    }
    //hash password
    const salt = 10;
    const hashed_password = await bcrypt.hash(password, salt);
    const user = await user_model.create({
      user_name,
      email,
      password: hashed_password,
      role,
    });
    res.status(201).json({
      message: "User registered successfully",
    });
    console.log("Successfully user Registered");
  } catch (e) {
    res.status(500).send({ error: e });
    console.log(e);
  }
};

// login component
export const login = async (req, res) => {
  try {
    const SECRET = "sdmvbsfbsf";
    const { email, password } = req.body;
    if (email == null || password == null) {
      return res.status(400).json({ message: "Feilds are empty" });
    }

    console.log("email", email);
    const check_user = await user_model.findOne({ email });

    if (!check_user)
      return res.status(404).json({
        message: `User with the following Credentials ${email} not found`,
      });
    // if user already exist
    const isMatch = await bcrypt.compare(password, check_user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // create a jwt token
    const token = jwt.sign(
      {
        id: check_user._id,
        role: check_user.role,
      },
      SECRET,
      { expiresIn: "1h" },
    );
    //  set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path:"/",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ token,
      "user":{
          user_id:check_user._id,
          role:check_user.role,
          email:check_user.email,
          name:check_user.user_name
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};


export const logout=(req,res)=>{
    //  remove cookie 
    try{
       res.clearCookie("token");
    res.status(200).json({message:"Successfully user logged out"})
    }catch(e){
      res.status(500).json("server error")
    }
}