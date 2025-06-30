const { mongoose, Schema } = require("../config/db");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: { type: String, trim: required, required: true },
    password: { type: String, required: true },
    email: { type: String, trim: required, required: true },
    description: String,
    avatar: { type: String, default: "/public/img/avatar.png" },
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema); // Entre comillas se coloca el nombre del modelo en mayúscula y en singular.

module.exports = User;
