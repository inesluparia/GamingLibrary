import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"


router.get("/api/:username/msgs", (req, res) => {
    const username = req.params.username
    if (req.session.username === username) {
        db.query(`SELECT * FROM messages 
        WHERE sender = ? 
        OR reciever = ?
        ORDER BY time DESC;`, [username, username], function (err, result) {
            if (!err) res.send({ data: result })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(401).send({ message: "Not authorized!" })
})

router.post("/api/:username/msgs", (req, res) => {
    const username = req.params.username
    const { time, content, reciever} = req.body
    if (req.session.username === username) {
        db.query(`INSERT INTO messages (time, reciever, content, sender) VALUES (?, ?, ?, ?)`,
        [time, reciever, content, req.params.username], function (err, result) {
            if (!err) res.status(201).send({ messageId: result.insertId})
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(401).send({ message: "Not authorized!" })
})

router.put("/api/:username/msgs/:id", (req, res) => {
    const username = req.params.username
    if (req.session.username === username) {
        db.query(`UPDATE messages SET is_read = true WHERE id = ${req.params.id}`,
        function (err, result) {
            if (!err) res.status(200).send({result})
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(401).send({ message: "Not authorized!" })
})

export default router

