import express from "express"
import { createJob, getJobsByUserId, getJobById, getAllJobs, updateJob, deleteJob } from "../controllers/jobController.js"
import verifyToken from "../middlewares/verifyTokenMiddleware.js"
import authorizeRole from "../middlewares/authorizeRoleMiddleware.js"

const router = express.Router()

router.post("/create-job", verifyToken, authorizeRole(["COMPANY", "ADMIN"]), createJob)
router.get("/get-jobs-by-user-id/:id", verifyToken, authorizeRole(["USER", "COMPANY", "ADMIN"]), getJobsByUserId)
router.get("/get-job-by-id/:id", verifyToken, authorizeRole(["USER", "COMPANY", "ADMIN"]), getJobById)
router.get("/get-all-jobs", verifyToken, authorizeRole(["USER", "COMPANY", "ADMIN"]), getAllJobs)
router.put("/update-job/:id", verifyToken, authorizeRole(["COMPANY", "ADMIN"]), updateJob)
router.delete("/delete-job/:id", verifyToken, authorizeRole(["COMPANY", "ADMIN"]), deleteJob)

export default router