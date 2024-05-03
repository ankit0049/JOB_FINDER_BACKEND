import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/job.controller.js";
import { isAutherized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAutherized, postJob);
router.get("/getmyjobs", isAutherized, getMyJobs);
router.put("/update/:id", isAutherized, updateJob);
router.delete("/delete/:id", isAutherized, deleteJob);
router.get("/:id", isAutherized, getSingleJob);

export default router;