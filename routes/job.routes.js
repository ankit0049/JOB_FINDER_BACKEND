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
import { toggleJobExpiration } from"../controllers/job.controller.js";

const router = express.Router();


router.put("/toggle-expired/:id",isAutherized, toggleJobExpiration);
router.get("/getall", getAllJobs);
router.post("/post", isAutherized, postJob);
router.get("/getmyjobs", isAutherized, getMyJobs);
router.put("/update/:id", isAutherized, updateJob); 
router.delete("/delete/:id", isAutherized, deleteJob);
router.get("/:id", isAutherized, getSingleJob);

export default router;