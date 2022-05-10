import db from "./createMySQLConnection.js"

let inDeleteMode = true

if (inDeleteMode) {
    db.query("DROP TABLE IF EXISTS favorites;")
    db.query("DROP TABLE IF EXISTS games;")
    db.query("DROP TABLE IF EXISTS messages;")
    db.query("DROP TABLE IF EXISTS users;")
}

db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30) UNIQUE,
        email VARCHAR(50) UNIQUE,
        phone_nr INT UNIQUE,
        password VARCHAR(100)
    );`
)

db.query(`
    CREATE TABLE IF NOT EXISTS games (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(70) NOT NULL,
        platform VARCHAR(50) NOT NULL,
        year INT,
        img VARCHAR(50),
        owner_id INT NOT NULL,
        CONSTRAINT FK_owner_id_game FOREIGN KEY (owner_id)
        REFERENCES users(id)
    );`
)


db.query(`
    CREATE TABLE IF NOT EXISTS favorites (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        game_id INT,
        CONSTRAINT FK_user_favorite FOREIGN KEY (user_id)
        REFERENCES users(id),
        CONSTRAINT FK_game_favorite FOREIGN KEY (game_id)
        REFERENCES games(id) 
    );`
)

db.query(`
    CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        time TIMESTAMP NOT NULL, 
        sender_id INT NOT NULL,
        reciever_id INT NOT NULL,
        content VARCHAR(300) NOT NULL,
        is_read TINYINT NOT NULL default 0,
        CONSTRAINT FK_sender_message FOREIGN KEY (sender_id)
        REFERENCES users(id),
        CONSTRAINT FK_reciever_message FOREIGN KEY (reciever_id)
        REFERENCES users(id)
    );`
)

if (inDeleteMode) {
    db.query(`INSERT INTO users (username, email, phone_nr, password) VALUES 
    ('testuser', 'test@email.com', 22222222, '$2b$12$wGOjPbsPTqUcaPo05O5ZuuqJLSQz1QV7NWUKAVd2udoW1NiqCyHWa')`)

    db.query(`INSERT INTO games (name, platform, year, owner_id, img) VALUES 
    ('Super Mario Odissey', 'Nintendo Switch', '2017', 1, 'smodissey.jpg'),
    ('Sonic Forces', 'Nintendo Switch', '2017', 1, 'sonic-forces.jpg'),
    ('Minecraft', 'Nintendo Switch', '2011', 1, 'minecraft-ns.jpg')
    `);
}

db.end()

// db.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Result: " + result);
    //   })

// ' YYYY-MM-DD hh:mm:ss ' format