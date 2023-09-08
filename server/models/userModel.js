const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
// Create Schema
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

// Pre-save middleware to hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = model("User", UserSchema);
