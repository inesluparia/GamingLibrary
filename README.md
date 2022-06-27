# 🎮 GamingLibrary
Node.js app where users can create a collection of their console games, add to favorites, borrow or trade them by finding and messaging with other gamers around.
Buildt with Svelte, node-express and MySQL, auth with express-sessions, bcrypt and socket.io. 

To be hosted soon but until then,
run localy by:
1. properly setting enviromental variables in .env

2. run the db schema with node:
```bash
cd server/database
node .\createMySQLSchema.js
```

3. run the app and find it in port 3000:
```bash
cd server
node app.js
```
