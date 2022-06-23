import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"


router.get("/api/:username/favs", (req, res) => {
    const username = req.params.username
    if (req.session.username === username) {
        db.query(`SELECT g.id, g.name, g.platform, g.year, g.img, g.owner_id, g.owner_username FROM games as g
        INNER JOIN favorites as f
        ON g.id = f.game_id 
        WHERE f.username = ?;`, [username], function (err, result) {
            if (!err) res.status(200).send(result)
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(401).send({ message: "Not authorized!" })
})


router.post("/api/:username/favs", (req, res) => {
    const username = req.params.username
    if (req.session.username === username) {
        db.query(`INSERT INTO favorites (username, game_id) VALUES (?, ?);`, [username, req.body.gameId],
        function (err, result) {
            if (!err) res.status(201).send({ favoriteId: result.insertId })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else res.status(401).send({ message: "Not authorized!" })
})

router.delete("/api/:username/favs/:gameid", async (req, res) => {
    const username = req.params.username
    if (req.session.username === username) {
        db.query(`DELETE FROM favorites 
        WHERE username = ?
        AND game_id = ?;`, [username, req.params.gameid], function (err, result) {
            if (!err) res.status(200).send({ result })
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else {
        res.status(401).send({ message: "Not authorized!" })
    }
})

router.get("/api/:username/favs/:gameid", async (req, res) => {
    const username = req.params.username
    if (req.session.username === username) {
        db.query(`SELECT id FROM favorites 
        WHERE username = ?
        AND game_id = ?;`, [username, req.params.gameid], function (err, result) {
            if (!err) res.status(200).send( result )
            else res.status(409).send({ message: "There has been an error: " + err.message })
        })
    } else {
        res.status(401).send({ message: "Not authorized!" })
    }
})

export default router

