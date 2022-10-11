const express = require('express');
let exerciseData = require("../data/workoutsdb.json");
// const es6Renderer = require('express-es6-template-engine');
// const { read } = require("fs");
// app.engine('html', es6Renderer);
// app.set('views', 'templates');
// app.set('view engine', 'ejs');

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {exerciseData})
})

router.get("/about_us", (req, res) => {
  res.render("about-us")
})

router.get("/blog_detail", (req, res) => {
  res.render("blog-detail")
})

router.get("/blog_list", (req, res) => {
  res.render("blog-list")
})

router.get("/bmi_calc", (req, res) => {
  res.render("bmi-calculator")
})

router.get("/login", (req, res) => {
  res.render("login")
})

router.get("/faq", (req, res) => {
  res.render("faq")
})
  
module.exports = router;
  
