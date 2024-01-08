const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");
const errorMessage = require("../utils/errorMessage");
const { jwtSecret } = require("../config");

//jwt sign in service
const jwtSignIn = (payload) => {
  const accessToken = jwt.sign(payload, jwtSecret.access, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, jwtSecret.refresh, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};

// find by property
const findByProperty = (key, value) => {
  if (!key || !value) return null;

  if (key === "_id") {
    return Auth.findById(value);
  }

  return Auth.findOne({ [key]: value });
};

// create a new user
const signupUser = async (data) => {
  try {
    const isEmailExist = await Auth.isEmailExist(data.email);
    if (isEmailExist) {
      throw errorMessage(`'${data.email}' already registered!`, 400);
    }
    return Auth.create(data);
  } catch (error) {
    console.error("Error in signupUser:", error);
    throw error;
  }
};            

// login
const login = async ({ email, password }) => {
  const auth = await findByProperty("email", email);

  if (!auth) throw errorMessage("Incorrect email or passowrd!", 401);

  const isPasswordMatch = await auth.comparePassword(password);
  if (!isPasswordMatch) throw errorMessage("Incorrect email or passowrd!", 401);

  if (!auth.active)
    throw errorMessage(
      "Account is not activated, please contact with admin",
      401
    );

  return auth;
};

// change passsword
const resetPassword = async ({ email, password }) => {
  const auth = await findByProperty("email", email);

  if (!auth) throw errorMessage("Incorrect email!", 401);

  auth.password = password;
  return auth.save();
};

module.exports = {
  signupUser,
  findByProperty,
  login,
  jwtSignIn,
  resetPassword,
};
