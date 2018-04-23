const express = require("express");
const userRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

/* GET User Home page */
userRoutes.get("/home", (req, res, next) => {
  Post.find()
    .then(postsFromDb => {
      res.locals.postList = postsFromDb;
      res.render("user/user-home");
    })
    .catch(err => {
      next(err);
    });
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
});

/* GET Posts page */
userRoutes.get("/home/post", (req, res, next) => {
  res.render("user/user-post-form");
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
});

// userRoutes.post("/process-post", (req, res, next) => {
//   console.log(req.body);
//   const { title, description } = req.body;
//   Post.create({ title, description })
//     .then(() => {
//       // redirect only to URLs if no redirectm form will resubmit upon refresh
//       res.redirect("/user/home");
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// userRoutes.get("/home/post/:postId", (req, res, next) => {
//   res.render("user/single-post");
//   if (!req.user) {
//     res.redirect("/auth/login");
//     return;
//   }
// });

module.exports = userRoutes;
