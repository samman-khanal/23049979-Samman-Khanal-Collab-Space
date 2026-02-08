//? Importing necessary modules and models.
import Comment from "../models/Comment.model.js";

//* Service function to add a new comment to a task.
export const addComment = async ({ taskId, userId, text }) =>
  Comment.create({ task: taskId, author: userId, text });

//* Service function to list all comments for a task.
export const listComments = async (taskId) =>
  Comment.find({ task: taskId })
    .populate("author", "fullName email avatarUrl")
    .sort({ createdAt: 1 });

//* Service function to delete a comment by its ID.
export const deleteComment = async (commentId, userId) => {
  //* Allowing to delete own comment only.
  const c = await Comment.findById(commentId);
  if (!c)
    throw Object.assign(new Error("Comment not found"), { statusCode: 404 });
  if (String(c.author) !== String(userId))
    throw Object.assign(new Error("Forbidden"), { statusCode: 403 });

  await Comment.deleteOne({ _id: commentId });
  return { deleted: true };
};
