//? Importing necessary modules and models.
import WorkspaceMember from "../models/WorkspaceMember.model.js";
import { HTTP } from "../constants/httpStatus.constant.js";

//* Middleware function to ensure the user is a member of the specified workspace.
export default async function requireWorkspaceMember(req, res, next) {
  const workspaceId = req.params.workspaceId || req.body.workspaceId;
  if (!workspaceId)
    return res
      .status(HTTP.BAD_REQUEST)
      .json({ message: "workspaceId required" });

  const member = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: req.user._id,
  });
  if (!member)
    return res
      .status(HTTP.FORBIDDEN)
      .json({ message: "Not a workspace member" });

  req.workspaceMember = member;
  next();
}
