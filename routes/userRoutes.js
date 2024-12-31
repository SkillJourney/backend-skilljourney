import express from "express"
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js"
import verifyToken from "../middlewares/verifyTokenMiddleware.js"
import authorizeRole from "../middlewares/authorizeRoleMiddleware.js"

const router = express.Router()

router.get("/get-all-user", verifyToken, authorizeRole(["ADMIN"]), getAllUsers)
router.get("/get-user-by-id/:id", verifyToken, authorizeRole(["USER", "COMPANY", "ADMIN"]), getUserById)
router.put("/update-user/:id", verifyToken, authorizeRole(["USER", "COMPANY", "ADMIN"]), updateUser)
router.delete("/delete-user/:id", verifyToken, authorizeRole(["USER", "COMPANY", "ADMIN"]), deleteUser)

export default router
