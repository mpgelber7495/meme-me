const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const Meme = require("./models/meme");
// const List = require("./models/list");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(require("./routes"));

// route for displaying the homepage
app.get("/", async (req, res) => {
  let memes = await Meme.findAll({ raw: true });
  res.render("home", { memes });
});

// route for displaying the add meme screen
app.get("/add-meme", async (req, res) => {
  res.render("addMeme");
});
app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});
