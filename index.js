import express from "express"
import { AdminRoutes } from "./routes/AdminRoutes.js"
import "dotenv/config"
import mongoose from "mongoose"


const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded())


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected")
})
.catch(() => {
    console.log("MongoDB Disconnected")
})

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/admin", AdminRoutes)
app.listen(PORT, () => {
    console.log(`Server is listeinig at http://localhost:${PORT}`)
})