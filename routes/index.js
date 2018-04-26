const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Post = require("../models/Post");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_user,
    pass: process.env.gmail_pass
  }
});

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Contact Us Page //
router.get("/contact", (req, res, next) => {
  res.render("contact-us");
});

router.post("/process-message", (req, res, next) => {
  const {
    sender,
    senderEmail,
    senderTel,
    memberYes,
    memberNo,
    subject,
    message
  } = req.body;
  transport
    .sendMail({
      from: "Website <website@example.com>",
      to: process.env.gmail_user,
      subject: `${sender} is trying to contact you`,
      text: `
    Name: ${sender}
    Email: ${senderEmail}
    Telephone: ${senderTel}
    Is Member: ${memberYes}
    Is not Member: ${memberNo}
    Subject: ${subject}
    Message: ${message}
    `,
      html: `
    <h1>Contact Form Message</h1>
    <p>Name: ${sender}</p>
    <p>Email: ${senderEmail}</p>
    <p>Telephone: ${senderTel}</p>
    <p>Is Member: ${memberYes}</p>
    <p>Is not Member: ${memberNo}</p>
    <p>Subject: ${subject}</p>
    <p>Message: ${message}</p>`
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

/* GET About us page */
router.get("/about", (req, res, next) => {
  res.render("about-us");
});

/* GET Recent Posts page */
router.get("/now", (req, res, next) => {
  Post.find()
    .sort({ created_at: -1 })
    .limit(10)
    .then(postsFromDb => {
      res.locals.postList = postsFromDb;
      res.render("recent-posts");
    })
    .catch(err => {
      next(err);
    });
});

// generate data for recent posts
router.get("/recentposts/data", (req, res, next) => {
  Post.find()
    .then(postsFromDb => {
      res.json(postsFromDb);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
