import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import welcomeRoutes from "./routes/welcomeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import sequelize from "./configurations/dbConfiguration.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({ origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}` }))

app.use("/", welcomeRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("*", (req, res) => { res.status(404).json({ message: "Route inconnue" }) })

app.use(errorMiddleware)

sequelize.sync()
    .then(() => {
        app.listen(process.env.BACKEND_PORT, () => {
            console.log(`Server running on port ${process.env.BACKEND_PORT} 🚀`)
        });
    })
    .catch((e) => {
        console.error("❌ Unable to connect to the database : ", e)
    });