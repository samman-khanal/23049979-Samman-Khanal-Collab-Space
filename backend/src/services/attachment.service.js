//? Importing necessary modules and models.
import Attachment from "../models/Attachment.model.js";

//* Service function to upload a new attachment to a task.
export const uploadAttachment = async ({ taskId, userId, file }) => {
  if (!file)
    throw Object.assign(new Error("File required"), { statusCode: 400 });

  const base64 = file.buffer.toString("base64");
  return Attachment.create({
    task: taskId,
    uploadedBy: userId,
    fileName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    dataBase64: base64,
  });
};

//* Service function to list all attachments for a task.
export const listAttachments = async (taskId) =>
  Attachment.find({ task: taskId }).sort({ createdAt: -1 });

//* Service function to delete an attachment by its ID.
export const deleteAttachment = async (attachmentId, userId) => {
  const a = await Attachment.findById(attachmentId);
  if (!a)
    throw Object.assign(new Error("Attachment not found"), { statusCode: 404 });
  if (String(a.uploadedBy) !== String(userId))
    throw Object.assign(new Error("Forbidden"), { statusCode: 403 });

  await Attachment.deleteOne({ _id: attachmentId });
  return { deleted: true };
};
