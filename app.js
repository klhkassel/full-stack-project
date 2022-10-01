const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

// const db = pgp("postgres://localhost:5432/workout");
const express = require("express");
const app = express();
const server = http.createServer(app);

const pgp = require("pg-promise")();

const es6Renderer = require("express-es6-template-engine");
const { read } = require("fs");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "ejs");
app.use(express.json());

// app.get("/result",  (request, res) => {
// var request = require('request');
// var muscle = 'biceps';
// request.get({
//   url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
//   headers: {
//     'X-Api-Key': 'GNwhKoMr3v0Eo7kYxoFStg==fm74587zcC86VBO0'
//   },
// }, function(error, response, body) {
//   if(error) return console.error('Request failed:', error);
//   else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//   else res.json(body)
// })

// })

app.use(express.static("public"));

let exerciseData = require("./data/workoutsdb");
app.get("/workout_builder", (req, res) => {
  res.render("workout-builder", { exerciseData });
});

app.get("/", (req, res) => {
  res.render("index", { exerciseData });
});

app.get("/about_us", (req, res) => {
  res.render("about-us");
});

app.get("/bmi_calc", (req, res) => {
  res.render("bmi-calculator");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/exercises/:id", (req, res) => {
  let id = req.params.id;
  let workouts = [];
  exerciseData.categories.forEach((category) => {
    if (category.type === id) {
      workouts = category.exercises;
    }
  });
  res.render("exercises", { id, workouts });
});

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
