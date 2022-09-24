const http = require("http");
const hostname = "127.0.0.1"
const port = 3000

// const db = pgp("postgres://localhost:5432/workout");
const express = require("express")
const app = express();
const server = http.createServer(app)

const pgp = require("pg-promise")();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


app.get("/", (req, res) => {
    res.send("home")
})


// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
