const express = require("express");
const userRoutes = express.Router();
const Twitter = require("../config/twitter");
const upload = require("../config/cloudinary");
const Civic = require("../config/civic");

const Axi = require("../config/civic");
const User = require("../models/User");
const Post = require("../models/Post");

/* GET User Home page */
userRoutes.get("/home", (req, res, next) => {
  Post.find({ postedBy: req.user._id })
    .then(postsFromDb => {
      res.locals.postList = postsFromDb;
      let userId = req.user._id;
      res.render("user/user-home", { userId });
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

userRoutes.post("/process-post", upload.single("picture"), (req, res, next) => {
  const postedBy = req.user._id;
  const { title, description } = req.body;
  const { secure_url } = req.file;

  Twitter.megaPicture(title, secure_url)
    .then(tweetResults => {
      Post.create({
        title,
        description,
        postedBy,
        pictureUrl: secure_url,
        coordinates: tweetResults[0],
        tweet_id: tweetResults[1].toString()
      });
      return tweetResults[0];
    })
    .then(post => {
      res.redirect("/user/home/");
      // redirect only to URLs if no redirect form will resubmit upon refresh
    })

    .catch(err => {
      next(err);
    });
});

// generate data for user home map
userRoutes.get("/userposts/data", (req, res, next) => {
  Post.find({ postedBy: req.user._id })
    .then(postsFromDb => {
      res.json(postsFromDb);
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
      res.render("user/single-post.hbs");
    })
    .catch(err => {
      next(err);
    });
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
});

userRoutes.get("/home/post/:postId/delete", (req, res, next) => {
  Post.findByIdAndRemove(req.params.postId)
    .then(results => {
      Twitter.deleteTweet(results.tweet_id);
    })
    .then(() => {
      res.redirect("/user/home");
    })
    .catch(err => {
      next(err);
    });
});

userRoutes.get("/home/post/:postId/retweet", (req, res, next) => {
  Post.findById(req.params.postId)
    .then(postDetails => {
      res.locals.postId = req.params.postId;
      res.locals.post = postDetails;
    })
    .then(coord => {
      return Civic.getStreetAddress(
        res.locals.post.coordinates[0],
        res.locals.post.coordinates[1]
      );
    })
    .then(address => {
      return Civic.getObjOfficials(address);
    })
    .then(data => {
      return Civic.scrapeNameAndTwitter(data);
    })
    .then(officials => {
      res.locals.twitters = officials;
      res.locals.postId = res.locals.post._id;
      res.render("user/retweet.hbs");
    })
    .catch(err => {
      next(err);
    });
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
});

userRoutes.get("/home/:postId/retweet/:politiciantwitter", (req, res, next) => {
  const retweet = `@${req.params.politiciantwitter} + ${req.params.title}`;
  Post.findById(req.params.postId)
    .then(postDetails => {
      return Twitter.megaPicture(retweet, postDetails.pictureUrl);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = userRoutes;
