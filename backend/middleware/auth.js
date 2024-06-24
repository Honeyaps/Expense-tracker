const jwt = require("jsonwebtoken");
require("dotenv").config();


function Auth(req, res, next) {
  const header = req.headers?.authorization;
  console.log(header)
  try {
    const token = jwt.verify(header, process.env.SECRET);
    if (!token) {
      return res.status(403).json({ msg: "Cannot perform operation" });
    }
    req.userId = token
    next();
  }catch (error) {
    console.log(error)
    return res.status(403).json({msg: "Cannot perform operation"})
  }
}
module.exports = Auth
