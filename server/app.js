import express from "express"
const app = express()

app.use(express.json())

//Helmet
import helmet from "helmet"
app.use(helmet())

//rate limiter
///OBS!!! will block all requests if hosted behind a proxy/load balancer (heroku, ngix, etc), then more config needed
import rateLimit from 'express-rate-limit'

const baseLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(baseLimiter)
app.use("/auth", authLimiter)

//Session
import session from "express-session"
import dotenv from "dotenv"
dotenv.config()

app.use(session({
    secret: process.env.SESSION_SECRET, // desactivated for debugging //secret: "testsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

import cors from "cors"
app.use(cors())
import path from "path"
app.use(express.static(path.resolve('../client/public')))

import gamesRouter from "./routers/gamesRouter.js"
app.use(gamesRouter)

import authRouter from "./routers/authRouter.js"
app.use(authRouter)

import usersRouter from "./routers/usersRouter.js"
app.use(usersRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {`Server running in port ${PORT} :)`})
