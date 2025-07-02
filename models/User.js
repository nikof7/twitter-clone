const { mongoose, Schema } = require("../config/db");
const bcrypt = require("bcrypt");

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

userSchema.pre("save" , async function(next) {
  try{
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    return next();
  }catch(err){
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
