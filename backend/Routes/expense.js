const express = require("express");
const { Expense } = require("../db");
const Auth = require("../middleware/auth");
const zod = require("zod");


const expenseRouter = express.Router();
const expenseValidator = zod.object({
  title: zod.string(),
  money: zod.number(),
});

//for adding expense data
expenseRouter.post("/addexp", Auth, async (req, res) => {
  const body = req.body;
  const sucess = expenseValidator.safeParse(body);
  if (!sucess.success) {
    return res.status(403).json({
      msg: "invalid inputs",
    });
  }
  try {
    const response = await Expense.create({
      userId: req.userId,
      date: body.date,
      title: body.title,
      money: body.money
    });

    return res.json({
      msg: "uploading done",
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "uploading error" });
  }
});

//for getting user expenses
expenseRouter.get("/get_userexp", Auth, async (req, res) => {
  try {
    const response = await Expense.find({ userId: req.userId });

    return res.json({ expense: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error while fetching expenses" });
  }
});

module.exports = expenseRouter;
