const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  urgency: { type: Number, required: true },
  importancy: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("task", UserSchema);
