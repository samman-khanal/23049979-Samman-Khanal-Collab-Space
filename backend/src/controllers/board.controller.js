//? Importing necessary modules and models.
import * as boardService from "../services/board.service.js";
import { HTTP } from "../constants/httpStatus.constant.js";

//* Controller function to create a new board in a specific workspace.
export const create = async (req, res, next) => {
  try {
    const data = await boardService.createBoard({
      workspaceId: req.params.workspaceId,
      name: req.body.name,
      userId: req.user._id,
    });
    res.status(HTTP.CREATED).json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to list all boards in a specific workspace.
export const list = async (req, res, next) => {
  try {
    res.json(await boardService.listBoards(req.params.workspaceId));
  } catch (e) {
    next(e);
  }
};

//* Controller function to get a specific board's information.
export const getOne = async (req, res, next) => {
  try {
    res.json(await boardService.getBoard(req.params.boardId));
  } catch (e) {
    next(e);
  }
};

//* Controller function to update a board's information.
export const update = async (req, res, next) => {
  try {
    res.json(await boardService.updateBoard(req.params.boardId, req.body));
  } catch (e) {
    next(e);
  }
};

//* Controller function to delete a board.
export const remove = async (req, res, next) => {
  try {
    res.json(await boardService.deleteBoard(req.params.boardId));
  } catch (e) {
    next(e);
  }
};
