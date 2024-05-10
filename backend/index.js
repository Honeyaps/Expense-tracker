const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/user");
const app = express();

app.use(cors());
app.use(express.json());

// for registration
app.use("/user",userRouter);

app.listen(4000, () => {
    console.log("Port connected")
})
