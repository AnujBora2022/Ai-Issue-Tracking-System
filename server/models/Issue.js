import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo"
    },

    // assignedTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User"
    // },

    // REPLACE WITH:
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    dueDate: {
      type: Date
    },

    tags: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
