const mongoose  = require("mongoose");

const userSchema =new mongoose.Schema({
  userName:{
    type:String,
    required:true
  },
  email:{
    type:String,

  },
  password:{
    type:String, 
    required:true
  },
 role: {
   type:String,
   enum:["Admin", "Student"],
   default:"Student"
  }
})


const User = mongoose.model("user", userSchema);

module.exports = User