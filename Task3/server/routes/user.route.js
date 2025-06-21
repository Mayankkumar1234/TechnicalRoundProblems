const express = require("express");
const userController = require("../controllers/UserRegistration");

const userRouter = express.Router();

userRouter.post("/register", userController.userRegistration);

userRouter.post("/login", userController.loginUser);

userRouter.post("/logout", userController.logoutUser);

module.exports = userRouter;
