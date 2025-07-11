const { mongoose, Schema } = require("../config/db");

const followSchema = new Schema(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    following: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
