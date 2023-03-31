const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  // Add other user-specific fields, such as name or email, if needed.
});

const User = mongoose.model("User", userSchema);

module.exports = User;
