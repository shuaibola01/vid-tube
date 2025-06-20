const { adminRouter } = require("./adminRoutes")
const authRouter = require("./authRoutes")
const usersRouter = require("./usersRoutes")

const router = require("express").Router

const baseRouter = router()

baseRouter.use("/auth", authRouter)
baseRouter.use("/users", usersRouter)
baseRouter.use("/admin", adminRouter)
module.exports= baseRouter