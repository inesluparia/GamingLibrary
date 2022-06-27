import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"
import authorize from "../app.js"

router.get("/api/:username/msgs", authorize, (req, res) => {
    db.query(`SELECT * FROM messages 
    WHERE sender = ? 
    OR reciever = ?
    ORDER BY time DESC;`, [req.params.username, req.params.username], function (err, result) {
        if (!err) res.send({ data: result })
        else res.status(409).send({ message: "There has been an error: " + err.message })
    })
})

router.post("/api/:username/msgs", authorize, (req, res) => {
    const { time, content, reciever} = req.body
    db.query(`INSERT INTO messages (time, reciever, content, sender) VALUES (?, ?, ?, ?)`,
    [time, reciever, content, req.params.username], function (err, result) {
        if (!err) res.status(201).send({ messageId: result.insertId})
        else res.status(409).send({ message: "There has been an error: " + err.message })
    })
})

router.put("/api/:username/msgs/:id", authorize, (req, res) => {
    db.query(`UPDATE messages SET is_read = true WHERE id = ${req.params.id}`,
    function (err, result) {
        if (!err) res.status(200).send({result})
        else res.status(409).send({ message: "There has been an error: " + err.message })
    })
})

export default router

