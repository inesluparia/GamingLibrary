import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"
import { socketIdByUser } from "../app.js"

import bcrypt from "bcrypt"

router.get("/auth/getuser", (req, res)=> {
    res.send({username : req.session.username})
})

router.get("/auth/signout", (req, res) => {
    socketIdByUser.delete(req.session.username)
    req.session.username = undefined
    req.session.userId = undefined
    res.status(200).send({data: "ok"})
})

router.post("/auth/signup", async (req, res) => {
    const { username, email, phone, password } = await req.body
    const hashedPassword = await bcrypt.hash(password, 12)
        db.query(`INSERT INTO users (username, email, phone_nr, password) VALUES (?, ?, ?, "${hashedPassword}");`,
                [username, email, phone], function (err, result) {
                    if (!err) {
                        req.session.userId = result.insertId
                        req.session.username = username
                        res.status(201).send({ username: username, userId: result.insertId })
                    } else {
                        console.log(err)
                        res.status(409).send({ message: "There has been an error: " + err.message })
                    }
                })
})

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body
    db.query(`SELECT password, username, id FROM users WHERE email = ?;`, [email], async function (err , result){
        if (err) 
            res.status(409).send({ message: "There has been an error: " + err.message })

        if (result.length) {
            const isSame = await bcrypt.compare(password, result[0].password);
            if (isSame) {
                req.session.userId = result[0].id
                req.session.username = result[0].username
                res.status(200).send({ username: result[0].username, userId: result[0].id })
            }
            else res.status(400).send({ message: "The password was incorrect." })
        } else res.status(404).send({ message: "The email was not found."})
    })
})

export default router