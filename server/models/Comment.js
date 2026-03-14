import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    commentText: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
