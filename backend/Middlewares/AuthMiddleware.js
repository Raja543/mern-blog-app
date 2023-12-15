const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false, message: "Token not provided" });
    }

    const decodedToken = await jwt.verify(token, process.env.TOKEN_KEY);

    if (!decodedToken) {
      return res.json({ status: false, message: "Invalid token" });
    }

    const user = await User.findById(decodedToken.id);

    if (user) {
      return res.json({ status: true, user: user.username });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
