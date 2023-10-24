const express = require("express");
const connection = require("./connection");
const Router = require("./Routers/router.js");
const userRouter = require("./Routers/userRouter.js");
const cors = require("cors");
const User = require("./Models/UserModel");

const verifyToken = require("./Middleware/auth");

const app = express();
const port = 8000;


app.use(express.json());
app.use(cors());

app.use("/products", Router);
app.use("/products", userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server Error");
});

app.get("/testToken", verifyToken, async (req, res) => {
  res.send("protected route");
});

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
