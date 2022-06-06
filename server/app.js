import "dotenv/config"
import express from "express"
const app = express()

import cors from "cors"
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

import path from "path"
app.use(express.static(path.resolve('../client/public')))

import helmet from "helmet"
app.use(helmet())

// rate limiter
// OBS!!! will block all requests if hosted behind a proxy/load balancer (heroku, ngix, etc), then more config needed
import rateLimit from 'express-rate-limit'

const baseLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false
});

app.use(baseLimiter)
app.use("/auth", authLimiter)

//Session
import session from "express-session"
const sessionMiddleware = session({
	secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
	cookie: { maxAge: 60000 * 60 * 24 * 7 } // 1 week
})
app.use(sessionMiddleware)

import gamesRouter from "./routers/gamesRouter.js"
app.use(gamesRouter)

import authRouter from "./routers/authRouter.js"
app.use(authRouter)

import usersRouter from "./routers/usersRouter.js"
app.use(usersRouter)

app.get('*', (req, res) => {
	res.sendFile(path.resolve("../client/public/index.html"))
})

import http from "http"
const server = http.createServer(app)

import { Server } from "socket.io"
const io = new Server(server)

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware))

let socketIdByUser = new Map()

io.on("connection", (socket) => {
	let sessionUsername

    socket.on("login", ({ username }) => {
		sessionUsername = socket.request.session.username
		if (username === sessionUsername) {
			socketIdByUser.set(sessionUsername, socket.id)
			console.log("socket login called", socketIdByUser)
		} else new Error("unautharized")
    });

	socket.on("new message", (data) => {
		const sessionUsername = socket.request.session.username
		if (data.sender === sessionUsername) {
			if (socketIdByUser.has(data.reciever)){
				const recieverSocketId = socketIdByUser.get(data.reciever)
				socket.to(recieverSocketId).emit('notify reciever', data)
			}
		} else new Error("unautharized")
	})

    socket.on("disconnect", () => {
		for (const [key, value] of socketIdByUser) {
			if (value === socket.id)
				socketIdByUser.delete(key)
		} console.log("socket disconnected", socketIdByUser)
	})
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running in port ${PORT} :)`))
