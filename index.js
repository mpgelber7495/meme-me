const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const Meme = require("./models/meme");
const User = require("./models/user");
const Comment = require("./models/comment");
// const List = require("./models/list");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
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

app.get("/meme/:id", async (req, res) => {
  let meme = await Meme.findAll({ where: { id: req.params.id }, raw: true });
  console.log(meme[0]);
  res.render("memeById", meme[0]);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.PORT || PORT}`);
});

// USE EXPRESS.STATIC to serve all of the static assets
