import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"
import authorize from "../app.js"

router.get("/api/:username/favs", authorize, (req, res) => {
    db.query(`SELECT g.id, g.name, g.platform, g.year, g.img, g.owner_id, g.owner_username FROM games as g
    INNER JOIN favorites as f
    ON g.id = f.game_id 
    WHERE f.username = ?;`, [req.params.username], function (err, result) {
        if (!err) res.status(200).send(result)
        else res.status(409).send({ message: "There has been an error: " + err.message })
    }) 
})

router.post("/api/:username/favs", authorize, (req, res) => {
    db.query(`INSERT INTO favorites (username, game_id) VALUES (?, ?);`, [req.params.username, req.body.gameId],
    function (err, result) {
        if (!err) res.status(201).send({ favoriteId: result.insertId })
        else res.status(409).send({ message: "There has been an error: " + err.message })
    })
})

router.delete("/api/:username/favs/:gameid", authorize, async (req, res) => {
    db.query(`DELETE FROM favorites WHERE username = ? AND game_id = ?;`,
        [req.params.username, req.params.gameid], function (err, result) {
        if (!err) res.status(200).send({ result })
        else res.status(409).send({ message: "There has been an error: " + err.message })
    })
})

router.get("/api/:username/favs/:gameid", authorize, async (req, res) => {
    db.query(`SELECT id FROM favorites 
    WHERE username = ?
    AND game_id = ?;`, [req.params.username, req.params.gameid], function (err, result) {
        if (!err) res.status(200).send( result )
        else res.status(409).send({ message: "There has been an error: " + err.message })
    })
})

export default router

