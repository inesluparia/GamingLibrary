import dotenv from "dotenv"
dotenv.config()

import mysql from "mysql2"

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

// connection.connect()

connection.connect( err => {
    if (!err) console.log("Connected to database established!") 
    else console.log("Connection to DB failed: " + JSON.stringify(err))
})

export default connection
