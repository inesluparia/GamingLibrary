import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"

//NOT TESTED
router.get("api/:userid/favs", (req, res) => {
    if (req.session.userId === parseInt(userId)) {
        db.query('SELECT * FROM favorites WHERE user_id = ?;', [req.params.userid], function (err, result) {
            if (!err) res.send({ data: result })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(404).send({ message: "Not authorized!" })
})

//NOT TESTED
router.post("api/:userid/favs", (req, res) => {
    const userId = req.params.userid
    if (req.session.userId === parseInt(userId)) {
        db.query(`INSERT INTO favorites (user_id, game_id) VALUES (${userId}, ? );`, [req.body.gameId],
        function (err, result) {
            if (!err) res.status(201).send({ favoriteId: result.lastID })
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
router.get("api/:userid/msgs", (req, res) => {
    const userId = req.params.userid
    if (req.session.userId === parseInt(userId)) {
        db.query(`SELECT * FROM messages 
        WHERE sender_id = ? 
        OR reciever_id = ?
        ORDER BY time ASC;`, [userId, userId], function (err, result) {
            if (!err) res.send({ data: result })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(404).send({ message: "Not authorized!" })
})

//NOT TESTED
router.post("api/:userid/msgs", (req, res) => {
    const userId = req.params.userid
    const { time, content, senderId, recieverId, isRead } = req.body
    if (req.session.userId === parseInt(userId)) {
        db.query(`INSERT INTO messages ( time, content, sender_id, reciever_id, is_read) VALUES (?, ?, ?, ?, ?)`,
        [ time, content, senderId, recieverId, isRead ], function (err, result) {
            if (!err) res.status(201).send({ messageId: result.lastID})
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(404).send({ message: "Not authorized!" })
})

export default router

