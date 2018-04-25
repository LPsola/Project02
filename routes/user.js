const express = require("express");
const userRoutes = express.Router();
const Tweet = require('../config/twitter');
const upload = require('../config/cloudinary')

const fs = require('fs');

const User = require("../models/User");
const Post = require("../models/Post");



/* GET User Home page */
userRoutes.get("/home", (req, res, next) => {
  Post.find({postedBy: req.user._id})
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

userRoutes.post("/process-post",
upload.single('picture'),
(req, res, next) => {
  const postedBy = req.user._id;
  const { title, description } = req.body;
  const { secure_url} = req.file;
  Post.create({ 
    title, 
    description, 
    postedBy,
    pictureUrl: secure_url,
    twitter_id: "",
   })
  .then(post => {
    Tweet.tweetPicture(title,secure_url);
    // redirect only to URLs if no redirect form will resubmit upon refresh
    res.redirect("/user/home/post/" + post._id);
  })
  .catch(err => {
    next(err);
  });
});

userRoutes.get("/home/post/:postId", (req, res, next) => {
  Post.findById(req.params.postId)
  .then(postDetails => {
    res.locals.postId = req.params.postId;
    res.locals.post = postDetails;
    res.render("user/single-post");
  })
  .catch(err => {
    next(err);
  });
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
});

userRoutes.get("/home/post/:postId/delete", (req,res,next) =>{
  Post.findByIdAndRemove(req.params.postId)
  .then(()=>{
    res.redirect("/")
  })
  .catch((err)=>{
    next(err)
  }) 
})
module.exports = userRoutes;
