//? Importing necessary modules and models.
import mongoose from "mongoose";

//* Defining the Attachment schema and model.
const schema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    // for demo: store as base64 (not recommended for production)
    dataBase64: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Attachment", schema);
