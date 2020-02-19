const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
//Auth0 integration
const { join } = require("path");
// const List = require("./models/list");

//Auth0 integration
const createAuth0Client = require("@auth0/auth0-spa-js");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(require("./routes"));

//Auth0 integration
app.use(express.static(join(__dirname, "public")));
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_DOMAIN/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "https://dev-ih2m-b95.auth0.com/api/v2/",
  issuer: `https://YOUR_DOMAIN/`,
  algorithms: ["RS256"]
});

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/auth", async (req, res) => {
  let isAuthenticated = await auth0.isAuthenticated();
  res.render("auth");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});
