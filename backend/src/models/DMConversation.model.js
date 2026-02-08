//? Importing necessary modules and models.
import mongoose from "mongoose";

//* Defining the DMConversation schema and model.
const schema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
    ],
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// A conversation is unique by (workspace + participants sorted)
schema.index({ workspace: 1, participants: 1 }, { unique: true });

export default mongoose.model("DMConversation", schema);
