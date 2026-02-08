//? Importing necessary modules and models.
import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import requireWorkspaceMember from "../middlewares/requireWorkspaceMember.middleware.js";
import { requireWorkspaceRole } from "../middlewares/requireWorkspaceRole.middleware.js";
import { WORKSPACE_ROLES } from "../constants/workspaceRoles.constant.js";
import * as inviteController from "../controllers/workspaceInvite.controller.js";

const router = Router();

//* Workspace invite routes with authentication middleware.
router.post(
  "/:workspaceId/invites",
  auth,
  requireWorkspaceMember,
  requireWorkspaceRole([WORKSPACE_ROLES.OWNER, WORKSPACE_ROLES.ADMIN]),
  inviteController.create,
);

router.get(
  "/:workspaceId/invites",
  auth,
  requireWorkspaceMember,
  requireWorkspaceRole([WORKSPACE_ROLES.OWNER, WORKSPACE_ROLES.ADMIN]),
  inviteController.list,
);

// Accept/reject via token
router.post("/invites/:token/accept", auth, inviteController.accept);
router.post("/invites/:token/reject", auth, inviteController.reject);

router.delete("/invites/:inviteId", auth, inviteController.cancel);

export default router;
