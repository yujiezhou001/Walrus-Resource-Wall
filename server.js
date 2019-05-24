"use strict";

require("dotenv").config();
const faker = require("faker");

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

const resources = [
        {id: 1, url: 'http://lorempixel.com/640/360/', title: 'ubuntu',  description: 'Web dev is so fun!', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 2, url: 'http://lorempixel.com/640/360/', title: 'new recipe', description: 'Spicy chicken curry!', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 3, url: 'https://learnenglish.britishcouncil.org/english-grammar', title: 'Learn English', description: 'Tutorial on English grammar for beginners', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 4, url: 'http://lorempixel.com/640/360/', title: 'new photo', description: 'My newest photo', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 5, url: 'http://lorempixel.com/640/360/', title: 'new idea', description: 'I want this bike', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 6, url: 'http://lorempixel.com/640/360/', title: 'my dog', description: 'My dog is performing magic', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 7, url: 'https://youtu.be/zctLck0TJNk', title: 'Advanced drumming techniques', description: 'Video on best warm-up techniques before a big show and creativity', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 8, url: 'https://dadwithapan.com/', title: 'Recipes for the busy dad', description: 'This blog is great if you’re a busy dad (partially or largely because you have kids) but you still need to feed them and yourself.', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 9, url: 'https://www.rejectiontherapy.com/100-days-of-rejection-therapy', title: 'Do the 100 days of rejection challenge', description: 'blog on how to face & overcome rejection which is paramount to success as an entrepreneur', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})},
        {id: 10, url: 'https://youtu.be/VWw_1-gEdLA', title: 'Magic tricks for beginners', description: 'Video showing easy magic tricks anyone can do!', user_id: faker.random.number({min:1, max:10}), topic_id: faker.random.number({min:1, max:7})}
      ]

const topics = [
        // Inserts seed entries
        {id: 1, default_img: 'http://lorempixel.com/640/360/', name: 'music'},
        {id: 2, default_img: 'http://lorempixel.com/640/360/', name: 'cooking'},
        {id: 3, default_img: 'http://lorempixel.com/640/360/', name: 'languages'},
        {id: 4, default_img: 'http://lorempixel.com/640/360/', name: 'arts_and_crafts'},
        {id: 5, default_img: 'http://lorempixel.com/640/360/', name: 'life_hacks'},
        {id: 6, default_img: 'http://lorempixel.com/640/360/', name: 'magic_tricks'},
        {id: 7, default_img: 'http://lorempixel.com/640/360/', name: 'web_dev'}
      ]

//------------- GET ----------//




app.get("/", (req, res) => {
  // let user_session = req.params['users_id'] // is that the field id in users table?
  // let templateVars = {} // main page content
  // if (!user_session){
  //   res.redirect("/login")
  // } else{
    res.redirect("/resources");
    // res.render("/resources", templateVars);
  // }

  // knex
  //   .select("*")
  //   .from("users")
  //   .then((users) => {
  //       // res.render("index", {users});
  //       res.render("temp");
  //       // res.send(users)
  //   });
});



app.get("/login", (req, res) => {
  let templateVars = {
  };

  res.render("login", templateVars);
});

app.get("/register", (req, res) => {
  let templateVars = {
  };

  res.render("register", templateVars);
});




app.get("/resources", (req, res) => {
  // knex.select("*")
  // .from("resources")
  // .then(results => {
  //   const templateVars= {resources: results}
  //   res.render("index", templateVars);
  // });
  // const templateVarswithresources = {resources: resources, topics:topics}
  const templateVars = {}
  knex
  .select("*")
  .from("resources")
  .then(results => {
    // res.send(results)
      templateVars.resources = results

  })
  .then(
    knex
    .select("*")
    .from("topics")
    .then(results => {
      templateVars.topics = results
      res.render("index", templateVars)
    })
  )



  console.log(templateVars);
  // res.send(resources)
  // const topics = knex.select("*").from("topics")

  // const templateVars = {'resources':resources,
  //                       'topics':topics};

  // res.render("index", templateVars);
});




// Search by Categories
app.get("/resources/topic/:name", (req, res) => {
  const templateVars = {}
  const topic = req.params.name
  knex
    .select("*")
    .from("topics")
    .where({
      name: topic
    })
    .then(results => {
      templateVars.topics = results
      console.log(results[0].id)
      return results[0].id
    })
    .then (id => {
      knex
      .select("*")
      .from("resources")
      .where("topic_id", id)
      .then(results => {
      templateVars.resources = results
      console.log(templateVars)
      res.render("index", templateVars)
      })
    })
})

// Search by name
app.get("/resources/search", (req, res) => {

  const templateVars = {}
  const identifier = req.query.myQuery
  console.log("output:" + identifier)
  knex
  .select("*")
  .from("resources")
  .where('title', 'like', `%${identifier}%`)
  .orWhere('description', 'like', `%${identifier}%`)
  .then(results => {
    // res.send(results)
    console.log("results:", results)
      templateVars.resources = results
  })
  .then(
    knex
    .select("*")
    .from("topics")
    .then(results => {
      templateVars.topics = results
      console.log(templateVars)
      res.render("index", templateVars)
    })
  )
});

app.get("/resources/:card_id", (req, res) => {
  let templateVars = {
  };
  res.render("one_resource", templateVars);
});

app.get("/user/:id", (req, res) => {
  let templateVars = {
  };
  res.render("profile", templateVars);
});

app.get("/user/:id/my_resources", (req, res) => {
  let templateVars = {
  };

  res.render("my_resources", templateVars);
});

//------------- POST ----------//

app.post("/login", (req, res) => {
  res.redirect("/index");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  knex("users")
    .insert({ username, email, password, user_img: faker.internet.avatar() })
    .then(function(result) {
      console.log(result)
      // ({ success: true, message: "ok" });
      // res.redirect("/login");
    });
  // res.redirect("/login");
});

app.post("/logout", (req, res) => {

  res.redirect("/");
});

app.post("/resources", (req, res) => {

 const resourceObj =  {
    url: req.body.theURL,
    title: req.body.theTitle,
    description: req.body.theDescription,
    topic_id: req.body.topic,
    user_id: 1
    //using 1 until we figure out how to get the acutal user id, maybe like this: req.params.user_id
  }
  // console.log(req.body)
  // console.log(resourceObj);
  res.redirect('/resources');

  // knex('resources')
  // .insert(resourceObj)
  // .into('resources')
  // .then(response => {res.redirect("/resources")})
  // .catch(err => {})
});

app.post("/user/:id", (req, res) => {
  res.redirect("/profile");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


// }
