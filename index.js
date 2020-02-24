const express = require("express");
const models = require("./models");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const Meme = require("./models/meme");
const User = require("./models/user");
const Comment = require("./models/comment");
// Authentication Dependencies
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();
const authRouter = require("./auth");

let userObject = {};

const session = {
  secret: "LoxodontaElephasMammuthusPalaeoloxodonPrimelephas",
  cookie: {},
  resave: false,
  saveUninitialized: false
};

// Passport configuration
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:8080/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    userObject.auth0_id = profile.user_id;
    userObject.email = profile.emails[0].value;
    userObject.nickname = profile.nickname;

    return done(null, profile);
  }
);

// if (app.get("env") === "production") {
//   // Serve secure cookies, requires HTTPS
//   session.cookie.secure = true;
// }
// End Authentication Dependencies
var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use("/", authRouter);
app.use(morgan("dev"));
app.use(require("./routes"));
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

// route for displaying the homepage
app.get("/", async (req, res) => {
  console.log("Easy to find me!!   ", req.user);
  let memes = await Meme.findAll({ raw: true });
  for (const meme of memes) {
    let user = await User.findAll({ where: { id: meme.UserId } });
    let comments = await Comment.findAll({ where: { MemeId: meme.id } });
    meme.userName = user[0].nickname;
    meme.commentCount = comments.length;
  }

  memes.reverse();
  res.render("home", { memes, user: req.user });
});

// route for displaying the add meme screen a
app.get("/add-meme", async (req, res) => {
  let userInfo = await req.user;
  console.log(userInfo);
  res.render("addMeme");
});

app.get("/meme/:id", async (req, res) => {
  let meme = await Meme.findAll({ where: { id: req.params.id }, raw: true });
  console.log(meme[0]);
  res.render("memeById", meme[0]);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});
