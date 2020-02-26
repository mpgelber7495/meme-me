var router = require("express").Router();
var Meme = require("../../models/meme");
var User = require("../../models/user");
var Comment = require("../../models/comment");

// route for displaying the homepage
router.get("/", async (req, res) => {
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

module.exports = router;
