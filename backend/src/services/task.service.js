//? Importing necessary modules and models.
import Task from "../models/Task.model.js";
import Column from "../models/Column.model.js";

//* Service function to create a new task in a column.
export const createTask = async ({ boardId, columnId, title, userId }) => {
  const count = await Task.countDocuments({ column: columnId });
  return Task.create({
    board: boardId,
    column: columnId,
    title,
    createdBy: userId,
    order: count,
  });
};

//* Service function to list all tasks in a board.
export const listTasksByBoard = async (boardId) =>
  Task.find({ board: boardId }).sort({ order: 1, createdAt: 1 });

//* Service function to get a task by its ID.
export const getTask = async (taskId) => Task.findById(taskId);

//* Service function to update a task's details.
export const updateTask = async (taskId, patch) => {
  const allowed = ["title", "description", "assignees", "dueDate", "priority"];
  const update = {};
  for (const k of allowed) if (patch[k] !== undefined) update[k] = patch[k];
  return Task.findByIdAndUpdate(taskId, update, { new: true });
};

//* Service function to delete a task by its ID.
export const deleteTask = async (taskId) => {
  await Task.deleteOne({ _id: taskId });
  return { deleted: true };
};

//* Service function to move a task to another column.
export const moveTask = async ({ taskId, toColumnId, toOrder }) => {
  const toColumn = await Column.findById(toColumnId);
  if (!toColumn)
    throw Object.assign(new Error("Target column not found"), {
      statusCode: 404,
    });

  const task = await Task.findById(taskId);
  if (!task)
    throw Object.assign(new Error("Task not found"), { statusCode: 404 });

  task.column = toColumnId;
  if (typeof toOrder === "number") task.order = toOrder;
  await task.save();

  return task;
};

//* Service function to reorder tasks within a column.
export const reorderTasksInColumn = async ({ columnId, orderedIds }) => {
  const ops = orderedIds.map((id, idx) => ({
    updateOne: {
      filter: { _id: id, column: columnId },
      update: { order: idx },
    },
  }));
  await Task.bulkWrite(ops);
  return { reordered: true };
};
