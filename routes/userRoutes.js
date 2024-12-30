import express from "express"
import { getAllUsers, getUserById, getUserByParams, updateUser, deleteUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/get-all-user", getAllUsers)
router.get("/get-user-by-id/:id", getUserById)
router.get("/get-user-by-params", getUserByParams)
router.put("/update-user/:id", updateUser)
router.delete("/delete-user/:id", deleteUser)

export default router
