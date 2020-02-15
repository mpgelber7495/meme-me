const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
// const List = require("./models/list");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(require("./routes"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});
