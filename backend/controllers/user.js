const Auth = require("../models/auth");

const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ name: user.name }).select(
      "name email"
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { profile };
