const express = require("express");
const connection = require("./connection/Config");
const userRouter = require("./routes/user.route");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.listen(9000, async () => {
  await connection;
  console.log("Our server is working at port :9000");
});

app.use("/api/user", userRouter);
