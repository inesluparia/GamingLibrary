import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"

// router.get("/api/games", (req, res) => {
//   db.query("SELECT * FROM games;", function (err, data) {
//     if (!err) res.send({ data: data })
//     else res.status(409).send({ message: "There has been an error: " + err.message })
//   })
// })

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
router.get("/api/:userid/games", (req, res) => {
  db.query(`SELECT g.id, g.name, g.platform, g.year, g.img, g.owner_id, u.username
  FROM games AS g
  INNER JOIN users as u ON g.owner_id = u.id
  WHERE g.owner_id = ?;`, [req.params.userid], function (err, result) {
    if (!err) res.status(200).send(result)
    else res.status(409).send({ message: "There has been an error: " + err.message })
  })  

})

//create game

import multer from "multer"
import fs from "fs"
const upload = multer()
// const upload = multer({limits: {fileSize:20000}})

router.post("/api/:userid/games", upload.single('uploaded_img'), async (req, res) => {
  const userId = req.params.userid
  const { name, platform, year } = req.body
  const imgName = req.file.originalname
  if (req.session.userId === parseInt(userId)) {
    await fs.promises.writeFile('../client/public/images/'+ req.file.originalname, req.file.buffer)
    db.query('INSERT INTO games (name, platform, year, img, owner_id) VALUES (?, ?, ?, ?, ?);',
      [name, platform, year, imgName, userId], function (err, result) {
        if (!err) {
          res.status(201).send({ gameId: result.insertId })
        }
        else res.status(409).send({ message: "There has been an error: " + err.message })
      })
  } else {
    res.status(404).send({ message: "Not authorized!" })
  }
})

// update endpoint not testet!
// router.post("/api/:userid/games/:id", (req, res) => {
//   const { name, platform, year, img } = req.body
//   if (req.session.userId === parseInt(req.params.userid)) {
//     db.query('UPDATE games SET name = ?, platform = ?, year = ?, img = ? WHERE id = ?;',
//       [name, platform, year, img, req.params.id], function (err, result) {
//         if (!err) {
//           res.status(200).send({ result })
//         }
//         else res.status(409).send({ message: "There has been an error: " + err.message })
//       })
//   } else {
//     res.status(404).send({ message: "Not authorized!" })
//   }
// })

//delete game
router.delete("/api/:userid/games/:id", (req, res) => {
  const userId = req.params.userid
    if (req.session.userId === parseInt(userId)) {
      db.query('DELETE FROM games WHERE id = ?;', [req.params.id], function (err, result) {
        res.status(200).send({result})
      })
    } else res.status(404).send({ message: "Not authorized!" })
})


export default router