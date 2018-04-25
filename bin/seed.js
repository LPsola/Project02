const mongoose = require("mongoose");

const User = require("../models/User");
const Post = require("../models/Post");

mongoose.Promise = Promise;
mongoose
  .connect("mongodb://localhost/project02", { useMongoClient: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const post = [
  {
    title: "Paris needs more fans",
    description: "I'm tired of sweating while sleeping",
    pictureUrl:
      "https://i.pinimg.com/originals/3e/7f/66/3e7f6667ab0eee2e40015e18d6b105e3.jpg",
    coordinates: [2.39, 48.86],
    postedBy: "5addb9cfd7da8f36aec1294d",
    status: "Unresolved",
    postPoints: 10
  }
];

const user = [
  {
    username: "The Rodman",
    email: "contact.seety@gmail.com",
    password: "lolencryption",
    twitter: "@APITestParis",
    userLocation: "Paris",
    role: "admin"
  }
];

User.create(user)
  .then(() => {
    console.log(`Created ${user.length} users`);
  })
  .catch(err => {
    console.log("Creation Error: ", err);
  });

Post.create(post)
  .then(() => {
    console.log(`Created ${post.length} posts`);
  })
  .catch(err => {
    console.log("Creation Error: ", err);
  });
