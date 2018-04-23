const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
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
  const { sender, senderEmail, message } = req.body;
  transport
    .sendMail({
      from: "Website <Klemar@example.com>",
      to: process.env.gmail_user,
      subject: `${sender} is trying to contact you`,
      text: `
    Name: ${sender}
    Email: ${senderEmail}
    Message: ${message}
    `,
      html: `
    <h1>Contact Form Message</h1>
    <p>Name: ${sender}</p>
    <p>Email: ${senderEmail}</p>
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
  res.render("recent-posts");
});

module.exports = router;
