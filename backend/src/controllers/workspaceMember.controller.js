//? Importing necessary modules and models.
import * as memberService from "../services/workspaceMember.service.js";

//* Controller function to list all members of a workspace.
export const list = async (req, res, next) => {
  try {
    res.json(await memberService.listMembers(req.params.workspaceId));
  } catch (e) {
    next(e);
  }
};

//* Controller function to change a member's role in a workspace.
export const changeRole = async (req, res, next) => {
  try {
    const data = await memberService.changeMemberRole({
      workspaceId: req.params.workspaceId,
      memberId: req.params.memberId,
      role: req.body.role,
    });
    res.json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to remove a member from a workspace.
export const remove = async (req, res, next) => {
  try {
    res.json(
      await memberService.removeMember({
        workspaceId: req.params.workspaceId,
        memberId: req.params.memberId,
      }),
    );
  } catch (e) {
    next(e);
  }
};
