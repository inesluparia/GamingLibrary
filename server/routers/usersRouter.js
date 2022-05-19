import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"

//NOT TESTED
router.get("/api/:userid/favs", (req, res) => {
    if (req.session.userId === parseInt(userId)) {
        db.query('SELECT * FROM favorites WHERE user_id = ?;', [req.params.userid], function (err, result) {
            if (!err) res.send({ data: result })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(404).send({ message: "Not authorized!" })
})

//NOT TESTED
router.post("/api/:userid/favs", (req, res) => {
    const userId = req.params.userid
    if (req.session.userId === parseInt(userId)) {
        db.query(`INSERT INTO favorites (user_id, game_id) VALUES (${userId}, ? );`, [req.body.gameId],
        function (err, result) {
            if (!err) res.status(201).send({ favoriteId: result.insertId })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(404).send({ message: "Not authorized!" })
})

//NOT TESTED
router.delete("/api/:userid/favs/:id", async (req, res) => {
    const id = req.params.userid
    if (req.session.userId === parseInt(id)) {
        db.query('DELETE FROM favorites WHERE id = ?;', [req.params.id], function (err, result) {
            if (!err) res.status(200).send({ result })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else {
        res.status(404).send({ message: "Not authorized!" })
    }
})

//NOT TESTED
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
    } else res.status(404).send({ message: "Not authorized!" })
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
    } else res.status(404).send({ message: "Not authorized!" })
})

export default router

