const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

const BlackListToken = mongoose.model("BlackList", blackListSchema);

module.exports = BlackListToken;
