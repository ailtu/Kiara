const express = require("express")
const cors = require("cors")

const testRoutes = require("./routes/testRoutes")
const authRoutes = require("./routes/authRoutes")
const listRoutes = require("./routes/listRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use(testRoutes)
app.use(authRoutes)
app.use(listRoutes)
app.use(taskRoutes)

module.exports = app