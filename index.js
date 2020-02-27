const express = require("express");
// const models = require("./models");
var cors = require("cors");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
// Authentication Dependencies
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();
const authRouter = require("./auth");

const session = {
  secret: "LoxodontaElephasMammuthusPalaeoloxodonPrimelephas",
  cookie: {},
  resave: false,
  saveUninitialized: false
};

const PORT = 8080;
// Passport configuration
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || `http://localhost:${PORT}/callback`
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

    console.log(`[DEBUG] passport.authenticate :: profile = ${profile}`);

    return done(null, profile);
  }
);

if (process.env.NODE_ENV === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
  app.enable("trust proxy");
}
// End Authentication Dependencies
var app = express();

app.use(cors());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

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

app.get("/me", (req, res) => {
  res.json({ user: req.user });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});
