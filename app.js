if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const express = require("express");
const app = express();
const server = http.createServer(app);

const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/workout");

//login added 2
const database = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];
//login added end 2

const es6Renderer = require("express-es6-template-engine");
const { read } = require("fs");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "ejs");
app.use(express.json());

//login added
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
//end login added

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


//login page: storing and comparing email and password,and redirecting to home page after login
app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(hashedPassword);
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
/////////////////////////////

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
