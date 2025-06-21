const User = require("../model/User");
const BlackList = require("../model/Blacklist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  userRegistration: async (req, res) => {
    //  console.log(req.body)
    const { name, email, password, role } = req.body;
    try {
      console.log(req.body);
      // console.log("u", userName);
      const checkExists = await User.findOne({ email: email });

      if (checkExists) {
        return res.send("User already exists , Please login");
      }
      if (!name || !email || !password) {
        return res.send("All fields are required...");
      }

      bcrypt.hash(password, 7, async (err, hash) => {
        if (err) return res.send({ error: err });
        else {
          const newUser = new User({
            userName: name,
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
        err: error.message,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ email: email }).select(
        "+password"
      );

      if (!checkUser) {
        return res.send("Please create an account");
      }

      bcrypt.compare(password, checkUser.password, (err, result) => {
        if (err) return res.status(404).send({ err: err });
        else {
          const token = jwt.sign(
            {
              id: checkUser._id,
              role: checkUser.role,
            },
            "codingRank",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "User has login successfully",
            user: checkUser,
            token,
          });
        }
      });
    } catch (error) {
      return res.status(400).json({
        err: error.message,
      });
    }
  },
  logoutUser: async (req, res) => {
    // try {
      let userToken = req.headers.authorization.split(" ")[1];
      console.log(userToken);
    //   let findToken = await BlackList.findOne({ token: userToken });
    //   if (findToken)
    //     return res.status(401).json({
    //       message: "User has already , logout",
    //     });
    //   else {
    //     let Token = new BlackList({
    //       token: userToken,
    //     });
    //     await Token.save();
    //   }

    //   return res.status(200).json({
    //     message: "User has logout successfully",
    //   });
    // } catch (error) {
    //   res.json({
    //     err: error.message,
    //     message: "Error while logout the user",
    //   });
    // }
  },
};

module.exports = userController;
