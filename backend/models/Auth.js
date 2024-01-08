const bcrypt = require("bcryptjs");
const { model, Schema } = require("mongoose");

// schema
const authSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      email: true,
      required: true,
    },
    role: {
      type: String,
      // required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// hashed password
authSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);

    this.password = hashed;
  }
  next();
});

// compare password
authSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    // Handle the error, you can log it or throw a specific error if needed
    console.error("Error in comparePassword:", error);
    throw new Error("Password comparison failed");
  }
};

// is email exist
authSchema.statics.isEmailExist = async function (email, excludeAuthId) {
  const auth = await this.findOne({ email, _id: { $ne: excludeAuthId } });
  return !!auth;
};

module.exports = model("auth", authSchema);
