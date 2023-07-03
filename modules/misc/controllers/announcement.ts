import type { Response } from "express";
import type { PaginatedRequestQueryParams, RequestWithBody } from "../../../helpers/types";
import { AnnouncementModel } from "../models/announcement";
import type { announcementValidator } from "@hmis/gatekeeper";
import { ERRORS } from "@hmis/gatekeeper";
import { createAnnouncement } from "../helpers/announcement";


export const getAnnouncements = async (req: PaginatedRequestQueryParams, res: Response) => {
  const announcements = await AnnouncementModel.paginate(
    { deleted: false },
    {
      $sort: { createdAt: -1 },
      lean: true,
      page: req.query.pageNumber,
      limit: req.query.pageSize,
    }
  );
  return res.status(200).json(announcements);
};

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
