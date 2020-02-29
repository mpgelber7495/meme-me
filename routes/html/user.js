var router = require("express").Router();
var Meme = require("../../models/meme");
var User = require("../../models/user");
var Comment = require("../../models/comment");
var Like = require("../../models/like");

router.get("/:id", async (req, res) => {
  let user = await User.findAll({ where: { id: req.params.id }, raw: true });
  let memes = await Meme.findAll({ where: { UserId: user[0].id }, raw: true });

  let comments = await Comment.findAll({
    where: { UserId: req.params.id },
    raw: true
  });

  console.log("USER:: ", user[0]);
  console.log("COMMENTS:: ", comments);
  console.log("LIKES::", comments[0]);
  //   console.log("LIKES:: ", likes);
  console.log(user[0]);
  res.render("userById", {
    memes: memes,
    user: user[0],
    // creatingUser: user,
    comments: comments
  });
});

module.exports = router;
