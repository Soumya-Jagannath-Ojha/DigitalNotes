require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/digitalnotes";
const noteRouter = require("./routes/digitalNote-route");
const cors = require("cors");
const User = require("./models/user");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { handleSignUp, handleSignIn } = require("./controller/note-controller");
const userRouter = require("./routes/user.js");
const passportSetup = require("./passport.js");
const authRoute = require("./routes/auth.js");
const dashboardRouter = require("./routes/dashboard.js");

main()
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE", // Your React frontend URL
    credentials: true, // Allows cookies to be sent with requests
  })
);
app.use(express.json());

const sessionOption = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //security purpose
  },
};

app.use(session(sessionOption));

// Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to set `currUser` as `req.user` in all responses
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

app.use("/api/notes", noteRouter);
app.use("/", userRouter);
app.use("/view", userRouter);
app.use("/dashboard",dashboardRouter)
// app.use("/note/:id/reviews",noteRouter);
app.use("/auth", authRoute);
// app.use("/dashboard", updateRouter);
// app.use("/signup",handleSignUp);
// app.use("/signin",handleSignIn);



app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).json({
    flashMessage: {
      type: "error",
      text: message,
    },
  });
});

app.listen(8080, () => {
  console.log("sever is lisening on port 8080");
});
