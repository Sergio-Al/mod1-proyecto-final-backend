require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//  adding cors
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const tareasRouter = require("./routes/tareas");

var app = express();

// CORS debugging
app.use((req, res, next) => {
  console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);
  console.log("Origin:", req.headers.origin);
  next();
});

// adding cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tareas", tareasRouter);

module.exports = app;
