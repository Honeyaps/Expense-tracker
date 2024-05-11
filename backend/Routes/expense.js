const express = require("express");
const { Expense } = require("../db");
const Auth = require("../middleware/auth");
const zod = require("zod")

require("dotenv").config();
const expenseRouter = express.Router();
const expenseValidator = zod.object({
  title: zod.string(),
  money: zod.number()
})

//for adding expense data
expenseRouter.post("/addexp", Auth, async (req, res) => {
    const body = req.body;
    console.log(body)
    const sucess = expenseValidator.safeParse(body)
    console.log(sucess)
    if(!sucess.success){
      return res.status(403).json({
        msg: "invalid inputs"
      })
    }
    try {
      const response = await Expense.create({
        userId: req.userId,
        date: Date.now(),
        title: body.title,
        money: body.money,
      });
  
      return res.json({
        msg: "uploading done",
      });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ msg: "uploading error" });
    }
  });

  module.exports = expenseRouter;