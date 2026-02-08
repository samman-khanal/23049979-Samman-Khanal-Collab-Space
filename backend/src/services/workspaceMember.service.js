//? Importing necessary modules and models.
import WorkspaceMember from "../models/WorkspaceMember.model.js";

//* Service function to list all members of a workspace.
export const listMembers = async (workspaceId) =>
  WorkspaceMember.find({ workspace: workspaceId }).populate(
    "user",
    "fullName email avatarUrl",
  );

  //* Service function to change a member's role in a workspace.
export const changeMemberRole = async ({ workspaceId, memberId, role }) => {
  const m = await WorkspaceMember.findOneAndUpdate(
    { _id: memberId, workspace: workspaceId },
    { role },
    { new: true },
  ).populate("user", "fullName email");
  return m;
};

//* Service function to remove a member from a workspace.
export const removeMember = async ({ workspaceId, memberId }) => {
  await WorkspaceMember.deleteOne({ _id: memberId, workspace: workspaceId });
  return { removed: true };
};
