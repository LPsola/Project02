const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    pictureUrl: { type: String },
    coordinates: [{ type: Number }], //[longitude, latitude]
    postedBy: {
      type: Schema.Types.ObjectId,
      //Referers to the document
      ref: "User",
      required: true
    },
    tweet_id: {type: String},
    status: {
      type: String,
      enum: ["Unresolved", "Resolved"],
      default: "Unresolved"
    },
    postPoints: { type: Number, default: 0 }
  },
  {
    timestamps: {
      createdAt: "created_at", //Will count as "Creation Date" field
      updatedAt: "updated_at"
    }
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
