import type { Response } from "express";
import type { PaginatedRequestQueryParams, RequestWithBody } from "../../../helpers/types";
import { AnnouncementModel } from "../models/announcement";
import type { MODELS, announcementValidator } from "@hmis/gatekeeper";
import { ERRORS } from "@hmis/gatekeeper";
import { createAnnouncement } from "../helpers/announcement";
import List from "../../default/list";

export const getAnnouncements = List<MODELS.IAnnouncement>(AnnouncementModel, {});

export const addAnnouncement = async (
  req: RequestWithBody<announcementValidator.CreateAnnouncementBody>,
  res: Response
) => {
  if (!req.isAuthenticated) throw ERRORS.newError('No user found');
  const announcement = await createAnnouncement({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id,
  });
  res.status(200).json(announcement);
};
