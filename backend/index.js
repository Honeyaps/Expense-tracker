const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/user");
const expenseRouter = require("./Routes/expense");
const app = express();

app.use(cors());
app.use(express.json());

// for registration
app.use("/user", userRouter);

// for adding expense
app.use("/exp", expenseRouter);

app.listen(4050, () => {
  console.log("Port connected");
});
