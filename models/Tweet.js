const { mongoose, Schema } = require("../config/db");

const articleSchema = new Schema(
  {
    content: { type: String, maxLength: 140, minLength: 1 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  },
);

const Article = mongoose.model("Article", articleSchema); // Entre comillas se coloca el nombre del modelo en mayúscula y en singular.

module.exports = Article;
