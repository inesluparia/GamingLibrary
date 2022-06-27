import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"

//get all games + USERNAME
router.get("/api/games", (req, res) => {
  db.query(`SELECT g.id, g.name, g.platform, g.year, g.img, g.owner_id, u.username
            FROM games AS g
            INNER JOIN users as u ON g.owner_id = u.id;`, function (err, data) {
    if (!err) res.send({ data: data })
    else res.status(409).send({ message: "There has been an error: " + err.message })
  })
})

//get game by id + USERNAME
router.get("/api/games/:id", (req, res) => {
  db.query(`SELECT g.id, g.name, g.platform, g.year, g.img, g.owner_id, u.username
  FROM games AS g
  INNER JOIN users as u ON g.owner_id = u.id
  WHERE g.id = ?;`, [req.params.id], function (err, result) {
    if (!err) res.send(result[0])
    else throw err
  })
})

//get all games from userID + USERNAME
router.get("/api/:username/games", (req, res) => {
  db.query(`SELECT g.id, g.name, g.platform, g.year, g.img, g.owner_id, u.username
  FROM games AS g
  INNER JOIN users as u ON g.owner_id = u.id
  WHERE u.username = ?;`, [req.params.username], function (err, result) {
    if (!err) res.status(200).send(result)
    else res.status(409).send({ message: "There has been an error: " + err.message })
  })  

})

//create game
import multer from "multer"
import fs from "fs"
const upload = multer() // const upload = multer({limits: {fileSize:20000}})

router.post("/api/:username/games", upload.single('uploaded_img'), async (req, res, next) => {
  const username = req.params.username
  const { name, platform, year } = req.body
  const imgName = req.file.originalname
  if (req.session.username === username) {
      try {
        await fs.promises.writeFile('../client/public/images/'+ req.file.originalname, req.file.buffer)
      } catch (err) {
        next(err)
      }
      db.query('INSERT INTO games (name, platform, year, img, owner_id, owner_username) VALUES (?, ?, ?, ?, ?, ?);',
      [name, platform, year, imgName, req.session.userId, username], function (err, result) {
        if (!err) {
          res.status(201).send({ gameId: result.insertId })
        }
        else res.status(409).send({ message: "There has been an error: " + err.message })
      })
    } else {
      res.status(401).send({ message: "Not authorized!" })
    }
})

//delete game
router.delete("/api/:username/games/:id", (req, res) => {
  if (req.session.username === req.params.username) {
    db.query('DELETE FROM games WHERE id = ?;', [req.params.id], function (err, result) {
        if (!err) res.status(200).send({result})
        else res.status(409).send({ message: "There has been an error: " + err.message })
      })
  } else res.status(401).send({ message: "Not authorized!" })
})

export default router

