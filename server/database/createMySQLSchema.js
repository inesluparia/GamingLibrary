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
        username VARCHAR(30) UNIQUE NOT NULL,
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
        owner_username VARCHAR(30) NOT NULL,
        CONSTRAINT FK_owner_id_game FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        CONSTRAINT FK_owner_username_game FOREIGN KEY (owner_username)
        REFERENCES users(username)
        ON DELETE CASCADE
    );`
)


db.query(`
    CREATE TABLE IF NOT EXISTS favorites (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30),
        game_id INT,
        CONSTRAINT FK_user_favorite FOREIGN KEY (username)
        REFERENCES users(username)
        ON DELETE CASCADE,
        CONSTRAINT FK_game_favorite FOREIGN KEY (game_id)
        REFERENCES games(id) 
        ON DELETE CASCADE
    );`
)

db.query(`
    CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        time DATETIME NOT NULL, 
        sender VARCHAR(30) NOT NULL,
        reciever VARCHAR(30) NOT NULL,
        content VARCHAR(300) NOT NULL,
        is_read TINYINT NOT NULL default 0,
        CONSTRAINT FK_sender_message FOREIGN KEY (sender)
        REFERENCES users(username),
        CONSTRAINT FK_reciever_message FOREIGN KEY (reciever)
        REFERENCES users(username)
    );`
)

if (inDeleteMode) {
    db.query(`INSERT INTO users (username, email, phone_nr, password) VALUES 
    ('Ines', 'ines@ines', 01010101, '$2b$12$wGOjPbsPTqUcaPo05O5ZuuqJLSQz1QV7NWUKAVd2udoW1NiqCyHWa'),
    ('Hugo', 'hugo@hugo', 88888888, '$2b$12$wGOjPbsPTqUcaPo05O5ZuuqJLSQz1QV7NWUKAVd2udoW1NiqCyHWa'),
    ('Luca', 'luca@luca', 22222222, '$2b$12$wGOjPbsPTqUcaPo05O5ZuuqJLSQz1QV7NWUKAVd2udoW1NiqCyHWa')
    `)

    db.query(`INSERT INTO games (name, platform, year, owner_id, owner_username, img) VALUES 
    ('Super Mario Odissey', 'Nintendo Switch', '2017', 1, 'Ines', 'smodissey.jpg'),
    ('Sonic Forces', 'Nintendo Switch', '2017', 1, 'Ines', 'sonic-forces.jpg'),
    ('Minecraft', 'Nintendo Switch', '2011', 1, 'Ines', 'minecraft-ns.jpg'),
    ('Assetto Corsa Competizione', 'PS4', '2005', 3, 'Luca', 'assetto-corsa-competizione-ps4.jpg'),
    ('Bugsnax', 'PS4', '2014', 3, 'Luca', 'bugsnax-ps4.jpg'),
    ('Grand Theft Auto St Andreas', 'PS4', '2014', 3, 'Luca', 'gta.jpg'),
    ('Lego Star Wars', 'PS4', '2012', 3, 'Luca', 'lego-star-wars.jpg'),
    ('Luigis Mansion 3', 'Nintendo Switch', '2005', 3, 'Luca', 'luigis-mansion-3.jpg'),
    ('Sonic Forces', 'PS4', '2017', 2, 'Hugo', 'sonic-forces.jpg'),
    ('Minecraft', 'PS4', '2011', 2, 'Hugo', 'minecraft-ns.jpg'),
    ('No more heroes III', 'Nintendo Switch', '2011', 2, 'Hugo', 'no-more-heroes.jpg'),
    ('Plants Vs Zombies', 'Nintendo Switch', '2011', 1, 'Ines', 'plantsVsZombies.jpg'),
    ('Pokemon Arceus', 'Nintendo Switch', '2011', 1, 'Ines', 'pokemon.jpg'),
    ('Minecraft', 'PS4', '2011', 2, 'Hugo', 'minecraft-ns.jpg')
    `)
}

db.end()
