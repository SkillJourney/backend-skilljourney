import express from "express"
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js"
import verifyToken from "../middlewares/verifyTokenMiddleware.js"

const router = express.Router()

router.get("/get-all-user", verifyToken, getAllUsers)
router.get("/get-user-by-id/:id", verifyToken, getUserById)
router.put("/update-user/:id", verifyToken, updateUser)
router.delete("/delete-user/:id", verifyToken, deleteUser)

export default router
