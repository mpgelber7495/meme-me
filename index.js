const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
//Auth0 integration
const { join } = require("path");
// const List = require("./models/list");

//Auth0 integration
const createAuth0Client = require("@auth0/auth0-spa-js");

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

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/auth", async (req, res) => {
  res.render("auth");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});
