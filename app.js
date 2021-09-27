//jshint esversion:6
const express = require("express")
const ejs = require("ejs")
const _ = require('lodash');
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set('view engine', "ejs")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

mongoose.connect('mongodb://localhost:27017/BlogPosts');

const Post = mongoose.model('Post', {
  postTitle: String,
  postBody: String
});




app.get("/", (req, res) => {
  // Search for all posts
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err)
    } else {
      res.render("home", {
        homeContent: homeStartingContent,
        posts: posts
      })
    }
  })


})

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  })
})
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  })
})

app.get("/compose", (req, res) => {
  res.render("compose")
})

app.post("/compose", (req, res) => {
  // Post Object that stores details of latest composed post
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  });

  // add that post object to the global posts array
  post.save();
  // send us back to the main page
  res.redirect("/")

})

app.get("/posts/:postID", (req, res) => {
  // console.log(req.params)
  const postID = req.params.postID
  Post.findById(postID, (err, post) => {
    if (err) {
      console.log(err)
    } else {
      if (!post) {
        res.redirect("/")
      } else {
        console.log(post)
        res.render("post", {
          postTitle: post.postTitle,
          postBody: post.postBody
        })
      }
    }
  })






})

app.get("/find", (req, res) => {

})

app.listen(3000, () => {
  console.log("App is now running on port 3000")
})







































// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");

// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
// const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));














// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
