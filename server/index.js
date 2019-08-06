const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();

//Middleware
app.use(
  cors({
    origin: "https://www.elecenter.com/"
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.elecenter.com/"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());

const email = require("./routes/api/email");

app.use("/api/email", email);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port} `));
