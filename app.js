const http = require("http");
const hostname = "127.0.0.1"
const port = 3000

const express = require("express")
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const server = http.createServer(app)
const bcrypt = require('bcrypt')

const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/workout");

const es6Renderer = require('express-es6-template-engine');
const { read } = require("fs");
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'ejs');
// app.use(express.json()):


app.use(express.static('public'));

let exerciseData = require("./data/workoutsdb");

//all other routes

app.use(require('./routes/otherRoutes'))

app.get("/workout_builder", async(req, res) => {
  let dayExercises = []
  let calendarInfo = await db.any("Select * FROM daysOfWeek_Exercises JOIN workout_input ON daysOfWeek_Exercises.workout_input = workout_input.id JOIN dayofweek ON daysOfWeek_Exercises.dayofweek = dayofweek.id");
  calendarInfo.forEach(day => {
    dayExercises.push(
      {
        dayName: day.dayofweek,
        exName: day.exercise,
        exType: day.workout,
        exInstruction: day.instructions
      }
    )
    // console.log(dayExercises)
  })

  // let calendarReset = await db.any("DELETE FROM daysOfWeek_Exercise");

  res.render("workout-builder", {exerciseData, dayExercises, calendarInfo} )
});



app.get("/exercises/:id", async (req, res) => {
  let id = req.params.id
  let workouts = []
  let benefits = []

  let benefitInfo = await db.any("SELECT * from workoutBenefits");
  benefitInfo.forEach(workout => {
    if(workout.workout_type === id) {
      benefits.push(workout.benefits)
    }
  })

  let exercises = await db.any("SELECT * from workout_input");
  exercises.forEach( obj => {
    if(obj.workout === id) {
      workouts.push(obj)
    }
  })

let dayofweek = await db.any('SELECT * from dayofweek');

  console.log(workouts)
  res.render("exercises", {id, workouts, benefits, dayofweek})
  })

app.post("/exercises", async (req, res) => {
  // const params = await req.body.json();
  // console.log(params);
  const exerciseId = req.body.exerciseId;
  const selectedDays = req.body.daysOfWeek;

  selectedDays.forEach(day => {
  db.query(`INSERT INTO daysOfWeek_Exercises(workout_input, dayofweek) VALUES(${exerciseId}, ${day})`);
  });

  res.sendStatus(200);
});

app.post("/exercises1", async (req, res) => {
  const exerciseId = req.body.exerciseId;
  console.log(exerciseId)
  // const selectedDays = .daysOfWeek;

  // selectedDays.forEach(day => {
  //   db.query(`INSERT INTO daysOfWeek_Exercises(workout_input, dayofweek) VALUES(${exerciseId}, ${day})`);
  // });

  res.sendStatus(200);
});


// app.get("/database", async(req, res) => {
//   let records = await db.any("SELECT * from dayofweek").then((dayofweek) => console.log(dayofweek))
//   res.json(records);
// });

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const {email, password} = req.body;
  let q = "INSERT INTO users VALUES (default, ${email}, ${hash})"
  console.log(`username: ${email} and password: ${password}`)
  bcrypt.hash(password, 10, async (err, hash) => {
    console.log(`hash: ${hash}`)
  db.result(q, {email,hash})
    console.log('after insert')
    // .then((result) => {
      console.log('redirect')
      res.redirect('login');
    // })
  })
});


app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  let q = "SELECT * from users WHERE email = ${email}"
  console.log(email, password)
  db.result({email, hash}, q => {
    console.log(user)
    bcrypt.compare(password, user.password, (err, match) => {
      if(match) {
        res.redirect('/')
      } else {
        console.log('redirect')
        res.redirect('/login')
      }
    })
  })
});

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
