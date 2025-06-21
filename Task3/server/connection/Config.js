const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb://localhost:27017/CrudOperation")
  .then(() => console.log("Connected to database successfully"))
  .catch(() => console.log("Error connecting to Database"));


  module.exports = connection

  