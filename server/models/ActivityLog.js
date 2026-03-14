import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    action: {
      type: String,
      required: true
    },

    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue"
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },

    details: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activitySchema);
