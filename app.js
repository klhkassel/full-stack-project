const http = require("http");
const hostname = "127.0.0.1"
const port = 3000
const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/workout");
const express = require("express")
const app = express();
const server = http.createServer(app)

const es6Renderer = require('express-es6-template-engine');
const { read } = require("fs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser")


app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'ejs');
app.use(express.json())

app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 259200
  }
}))

let hashedPassword = ""; 
bcrypt.hash("password", 10, (err, hash) => {
  hashedPassword = hash
  console.log(hash)
})



app.use(express.static('public'));

let exerciseData = require("./data/workoutsdb");

app.get("/workout_builder", (req, res) => {
  res.render("workout-builder", {exerciseData})
});

app.post("/workout_buider", (req, res) => {
  

})

// TRY AND GET THIS TO WORK 
app.get("/", checkAuth, (req, res) => {
  if(req.session.username) {
    res.render("index", {exerciseData},)
  } else {
    res.send("incorrect")
  }
  
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
  exerciseData.categories.forEach(category => {
    if(category.type === id) {
      workouts = category.exercises
    }
  })
  res.render("exercises", {id, workouts})
})

// app.post("/exercises/:id", {})

app.get("/login", checkAuth, (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  db.any("SELECT * from users").then((users) => console.log(users));
  const { username, password } = req.body;

  if (username == "user") {
    bcrypt.compare(password, hashedPassword, (err, match) => {
      if (match) {
            req.session.username = username;
            res.redirect("/workout_buider")
      } else {
        res.render("/login")
      }
    })
  } else {
    res.send("unknown user")
  }

})

function checkAuth(req, res, next) {
  if(req.session.username) {
    next();
  } else if(req.path == "/login") {
    next();
  } else {
    res.redirect("/login")
  }

}

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
