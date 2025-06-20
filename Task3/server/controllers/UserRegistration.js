const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  userRegistration: async (req, res) => {
    try {
      const { userName, email, password } = req.body;

      const checkExists = await User.findOne({ email: email });

      if (checkExists.length > 0) {
        return res.send("User already exists , Please login");
      }
      if (!userName || !email || !password) {
        return res.send("All fields are required...");
      }

      bcrypt.hash(password, 7, async (err, hash) => {
        if (err) return res.send({ error: err });
        else {
          const newUser = new User({
            userName: userName,
            email: email,
            password: hash,
            role,
          });

          await newUser.save();
        }
      });

      return res.status(200).json({
        message: "User has registered successfully",
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(400).json({
        message: "Error in registration",
        err: error,
      });
    }
  },
  loginUser:async (req, res)=>{
    const {email , password} = req.body;
    const checkExists = await User.findOne({});
  }
};


module.exports = userController;