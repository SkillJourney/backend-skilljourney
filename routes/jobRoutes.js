import express from "express"
import { createJob, getJobsByUserId, getJobById, getAllJobs, updateJob, deleteJob } from "../controllers/jobController.js"
import verifyToken from "../middlewares/verifyTokenMiddleware.js"

const router = express.Router()

router.post("/create-job", verifyToken, createJob)
router.get("/get-jobs-by-user-id/:id", verifyToken, getJobsByUserId)
router.get("/get-job-by-id/:id", verifyToken, getJobById)
router.get("/get-all-jobs", verifyToken, getAllJobs)
router.put("/update-job/:id", verifyToken, updateJob)
router.delete("/delete-job/:id", verifyToken, deleteJob)

export default router
