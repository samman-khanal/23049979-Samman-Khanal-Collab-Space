import * as channelService from "../services/channel.service.js";
import { HTTP } from "../constants/httpStatus.constant.js";

export const create = async (req, res, next) => {
  try {
    const c = await channelService.createChannel({
      workspaceId: req.params.workspaceId,
      name: req.body.name,
      type: req.body.type || "public",
      userId: req.user._id,
    });
    res.status(HTTP.CREATED).json(c);
  } catch (e) {
    next(e);
  }
};

export const list = async (req, res, next) => {
  try {
    const rows = await channelService.listChannels({
      workspaceId: req.params.workspaceId,
      userId: req.user._id,
    });
    res.json(rows);
  } catch (e) {
    next(e);
  }
};

export const addMembers = async (req, res, next) => {
  try {
    const channel = await channelService.addMembersToChannel({
      channelId: req.params.channelId,
      userIds: req.body.userIds || [],
    });
    res.json(channel);
  } catch (e) {
    next(e);
  }
};

export const join = async (req, res, next) => {
  try {
    const c = await channelService.joinChannel({
      channelId: req.params.channelId,
      userId: req.user._id,
    });
    res.json(c);
  } catch (e) {
    next(e);
  }
};

export const leave = async (req, res, next) => {
  try {
    const c = await channelService.leaveChannel({
      channelId: req.params.channelId,
      userId: req.user._id,
    });
    res.json(c);
  } catch (e) {
    next(e);
  }
};
