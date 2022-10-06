const http = require("http");
const hostname = "127.0.0.1"
const port = 3000

const express = require("express")
const app = express();
const server = http.createServer(app)

const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/workout");

const es6Renderer = require('express-es6-template-engine');
const { read } = require("fs");
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'ejs');
app.use(express.json())

app.use(express.static('public'));

let exerciseData = require("./data/workoutsdb");

app.get("/workout_builder", (req, res) => {
  res.render("workout-builder", {exerciseData})
});

app.post("/workout_buider", (req, res) => {
  

})


app.get("/", (req, res) => {
  res.render("index", {exerciseData})
})

app.get("/about_us", (req, res) => {
  res.render("about-us")
})

app.get("/blog_detail", (req, res) => {
  res.render("blog-detail")
})

app.get("/blog_list", (req, res) => {
  res.render("blog-list")
})

app.get("/bmi_calc", (req, res) => {
  res.render("bmi-calculator")
})

app.get("/contact", (req, res) => {
  res.render("contact")
})

app.get("/faq", (req, res) => {
  res.render("faq")
})

app.get("/exercises/:id", (req, res) => {
  let id = req.params.id
  let workouts = []
  let benefits = []
  exerciseData.categories.forEach(category => {
    if(category.type === id) {
      workouts = category.exercises
      benefits = category.benefits
    }
  })
  res.render("exercises", {id, workouts, benefits})
  })

app.get("/database", async(req, res) => {
  let records = await db.any("SELECT * from dayofweek").then((dayofweek) => console.log(dayofweek))
})



// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
