const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const express = require("express");
const app = express();
const server = http.createServer(app);

const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/workout");

//login authentication
const database = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUnititalized: true,
    cookie: {
      secure: false,
      maxAge: 2592000,
    },
  })
);

bcrypt.hash(myPassword, saltRounds, (err, hash) => {});

//

const es6Renderer = require("express-es6-template-engine");
const { read } = require("fs");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "ejs");
app.use(express.json());

app.use(express.static("public"));

let exerciseData = require("./data/workoutsdb");

app.get("/workout_builder", (req, res) => {
  res.render("workout-builder", { exerciseData });
});

app.post("/workout_buider", (req, res) => {});

app.get("/", (req, res) => {
  res.render("index", { exerciseData });
});

app.get("/about_us", (req, res) => {
  res.render("about-us");
});

app.get("/blog_detail", (req, res) => {
  res.render("blog-detail");
});

app.get("/blog_list", (req, res) => {
  res.render("blog-list");
});

app.get("/bmi_calc", (req, res) => {
  res.render("bmi-calculator");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

//login
app.post("/contact", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  findUser(email, password)
    .then((user) => {
      req.session.email = user;
      res.redirect("/index");
    })
    .catch((err) => {
      res.send("login failure");
    });
});

//login page: storing and comparing email and password,and redirecting to home page after login
app.post("/user", function (req, res) {
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(function (user) {
    if (!user) {
      res.redirect("/contact");
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          res.redirect("/index");
        } else {
          res.send("Incorrect password");
          res.redirect("/");
        }
      });
    }
  });
});
//

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/exercises/:id", async (req, res) => {
  let id = req.params.id;
  let workouts = [];
  let benefits = [];

  let dayofweek = await db.any("SELECT * from dayofweek");
  console.log(dayofweek);
  exerciseData.categories.forEach((category) => {
    if (category.type === id) {
      workouts = category.exercises;
      benefits = category.benefits;
    }
  });
  res.render("exercises", { id, workouts, benefits, dayofweek });
});

app.post("/exercises", async (req, res) => {
  const params = await req.body.json();
  console.log(params);
  const exerciseId = params.exerciseId;
  const selectedDays = params.daysOfWeek;

  selectedDays.forEach((day) => {
    db.query(
      `INSERT INTO daysOfWeek_Exercises(workout_input, dayofweek) VALUES(${exerciseId}, ${day})`
    );
  });

  res.sendStatus(200);
});

// app.get("/database", async(req, res) => {
//   let records = await db.any("SELECT * from dayofweek").then((dayofweek) => console.log(dayofweek))
//   res.json(records);
// });

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
