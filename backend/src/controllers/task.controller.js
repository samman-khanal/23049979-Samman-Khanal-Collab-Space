//? Importing necessary modules and models.
import * as taskService from "../services/task.service.js";
import { HTTP } from "../constants/httpStatus.constant.js";

//* Controller function to create a new task in a specific column of a board.
export const create = async (req, res, next) => {
  try {
    const data = await taskService.createTask({
      boardId: req.params.boardId,
      columnId: req.params.columnId,
      title: req.body.title,
      userId: req.user._id,
    });
    res.status(HTTP.CREATED).json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to list all tasks in a specific board.
export const listByBoard = async (req, res, next) => {
  try {
    res.json(await taskService.listTasksByBoard(req.params.boardId));
  } catch (e) {
    next(e);
  }
};

//* Controller function to get a specific task's information.
export const getOne = async (req, res, next) => {
  try {
    res.json(await taskService.getTask(req.params.taskId));
  } catch (e) {
    next(e);
  }
};

//* Controller function to update a task's information.
export const update = async (req, res, next) => {
  try {
    res.json(await taskService.updateTask(req.params.taskId, req.body));
  } catch (e) {
    next(e);
  }
};

//* Controller function to delete a task.
export const remove = async (req, res, next) => {
  try {
    res.json(await taskService.deleteTask(req.params.taskId));
  } catch (e) {
    next(e);
  }
};

//* Controller function to move a task to a different column or reorder it within the same column.
export const move = async (req, res, next) => {
  try {
    res.json(
      await taskService.moveTask({
        taskId: req.params.taskId,
        toColumnId: req.body.toColumnId,
        toOrder: req.body.toOrder,
      }),
    );
  } catch (e) {
    next(e);
  }
};

//* Controller function to reorder tasks within the same column.
export const reorderInColumn = async (req, res, next) => {
  try {
    res.json(
      await taskService.reorderTasksInColumn({
        columnId: req.params.columnId,
        orderedIds: req.body.orderedIds,
      }),
    );
  } catch (e) {
    next(e);
  }
};
