const express = require("express");
const mongodb = require("mongodb");
var cors = require("cors");
var mailgun = require("mailgun.js");
var mg = mailgun.client({
  username: "api",
  key: `${process.env.REACT_APP_KEY}`
});
const router = express.Router();

// get posts
router.post("/", cors(), async (req, res) => {
  let emailForm = req.body.emailForm;
  if (emailForm.email.length > 4) {
    mg.messages
      .create("sandboxe0be8744de3342afa055b7312a8ac166.mailgun.org", {
        from: `${emailForm.email}`,
        to: ["johnkirbycampbell@gmail.com"],
        subject: `Message from ${emailForm.name}`,
        text: `<div><h1>Message from ${emailForm.name}</h1><p>${
          emailForm.comment
        }</p><br /> <p>Contact User at: <br />${emailForm.email}<br />${
          emailForm.phone
        }<br />${emailForm.address} ${emailForm.cityStateZip}</p></div>`,
        html: `<div><h1>Message from ${emailForm.name}</h1><p>${
          emailForm.comment
        }</p><br /> <p>Contact User at: <br />${emailForm.email}<br />${
          emailForm.phone
        }<br />${emailForm.address} ${emailForm.cityStateZip}</p></div>`
      })
      .then(msg => {
        console.log(msg);
      }) // logs response data
      .catch(err => console.log(err)); // logs any error
    //res.status(201).send();
  }
});

module.exports = router;
