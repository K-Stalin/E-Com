import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Routed for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route  for User Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking User already exists or not
    const exist = await UserModel.findOne({ email });

    if (exist) {
      return res.json({ success: false, message: "User already Exist" });
    }

    // Validating email format & strong format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // Await the result of genSalt
    const hashedPassword = await bcrypt.hash(password, salt); // Use the generated salt

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save(); // to save in DB

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// Route for Admin Login
const adminLogin = async (req, res) => {
  try {
    // get user email and password
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credential" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// Profile Information

const profileInformation = async (req, res) => {
  const { userId } = req.body;
   
  try {
    // Find user by userId directly
    const profile = await UserModel.findById(userId);

    if (profile) {
      res.json({success:true,profile});
    } else {
      res.json({ success: false, message: "Profile not found" });
   
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const profileUpdate =  async (req,res) =>{
      const { userId , name , email  } = req.body



      try {
          const profile = await UserModel.findByIdAndUpdate(userId,{name,email})
           
          if(profile)
          {
             res.json({success:true,message:'Updated SuccessFuly!'})
          }
          else
          {
               res.json({ success: false, message: "Profile not found" });
          }
           
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
      }
}






export { loginUser, registerUser, adminLogin  , profileInformation , profileUpdate };
