import { Router } from "express"
const router = Router()
import db from "../database/createMySQLConnection.js"

import bcrypt from "bcrypt"

router.post("/auth/signup", async (req, res) => {
    const { regUsername, regEmail, regPhone, regPassword } = await req.body
    const hashedPassword = await bcrypt.hash(regPassword, 12)
        db.query(`INSERT INTO users (username, email, phone_nr, password) VALUES (?, ?, ?, "${hashedPassword}");`,
                [regUsername, regEmail, regPhone], function (err, result) {
                    if (!err) {
                        req.session.userId = result.lastID
                        req.session.email = regEmail
                        res.status(201).send({ username: regUsername, userId: result.lastID })
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
            else res.status(400).send({ message: "Incorrect password." })
        } 
        else res.status(404).send({ message: "Email was not found."})
    })
})

export default router