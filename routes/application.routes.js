import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/application.controller.js";
import { isAutherized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/post", isAutherized, postApplication);
router.get("/employer/getall", isAutherized, employerGetAllApplications);
router.get("/jobseeker/getall", isAutherized, jobseekerGetAllApplications);
router.delete("/delete/:id", isAutherized, jobseekerDeleteApplication);

export default router;