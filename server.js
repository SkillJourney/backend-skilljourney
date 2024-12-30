import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import welcomeRoutes from "./routes/welcomeRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({ origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}` }))

app.use("/", welcomeRoutes)

app.use(errorMiddleware)

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
});
