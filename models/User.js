const { mongoose, Schema } = require("../config/db");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: { type: String, trim: true, required: true },
    password: { type: String, required: true },
    email: { type: String, trim: true, required: true },
    description: String,
    image: { type: String, default: "avatar.png" },
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
