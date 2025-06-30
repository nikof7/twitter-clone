const { mongoose, Schema } = require("../config/db");

const tweetSchema = new Schema(
  {
    content: { type: String, maxLength: 140, minLength: 1 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  },
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
