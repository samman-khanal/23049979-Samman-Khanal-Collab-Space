//? Importing necessary modules and models.
import Board from "../models/Board.model.js";

//* Service function to create a new board in a workspace.
export const createBoard = async ({ workspaceId, name, userId }) =>
  Board.create({ workspace: workspaceId, name, createdBy: userId });

//* Service function to list all boards in a workspace.
export const listBoards = async (workspaceId) =>
  Board.find({ workspace: workspaceId }).sort({ createdAt: -1 });

//* Service function to get a board by its ID.
export const getBoard = async (boardId) => Board.findById(boardId);

//* Service function to update a board's name.
export const updateBoard = async (boardId, patch) =>
  Board.findByIdAndUpdate(boardId, { name: patch.name }, { new: true });

//* Service function to delete a board by its ID.
export const deleteBoard = async (boardId) => {
  await Board.deleteOne({ _id: boardId });
  return { deleted: true };
};
