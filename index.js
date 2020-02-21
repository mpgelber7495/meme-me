const express = require("express");
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
    return done(null, profile);
  }
);

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}
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
app.use(morgan("dev"));
app.use(require("./routes"));

// route for displaying the homepage
app.get("/", async (req, res) => {
  let memes = await Meme.findAll({ raw: true });

  for (const meme of memes) {
    let user = await User.findAll({ where: { id: meme.UserId } });
    let comments = await Comment.findAll({ where: { MemeId: meme.id } });

    meme.userName = user[0].nickname;
    meme.commentCount = comments.length;
  }
  memes.reverse();
  res.render("home", { memes });
});

// route for displaying the add meme screen
app.get("/add-meme", async (req, res) => {
  res.render("addMeme");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});

// USE EXPRESS.STATIC to serve all of the static assets
