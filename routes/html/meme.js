var router = require("express").Router();
var secured = require("../../utils/secured");
var Meme = require("../../models/meme");
var User = require("../../models/user");
var Comment = require("../../models/comment");
var Like = require("../../models/like");

router.get("/:id", secured, async (req, res) => {
  let meme = await Meme.findAll({ where: { id: req.params.id }, raw: true });
  let user = await User.findAll({ where: { id: meme[0].UserId }, raw: true });
  let comments = await Comment.findAll({
    where: { MemeId: req.params.id },
    raw: true
  });
  for (let i = 0; i < comments.length; i++) {
    let likes = await Like.findAll({
      where: { CommentId: comments[i].id },
      raw: true
    });
    var likesLength = likes.filter(function(element) {
      return element.up_or_down == 1;
    });
    var dislikesLength = likes.filter(function(element) {
      return element.up_or_down == 0;
    });

    comments[i].likesArray = likes;
    comments[i].likes = likesLength.length;
    comments[i].dislikes = dislikesLength.length;
    let user = await User.findAll({
      where: { id: comments[i].UserId },
      raw: true
    });

    comments[i].user = user[0].nickname;
  }
  req.user.parsedId = req.user.id.split("|")[1];
  //   let likes = await Like.findAll({
  //     where: { MemeId: req.params.id },
  //     raw: true
  //   });
  console.log("USER:: ", user);
  console.log("COMMENTS:: ", comments);
  // console.log("LIKES::", comments[0].likes);
  //   console.log("LIKES:: ", likes);
  console.log(meme[0]);
  res.render("memeById", {
    meme: meme[0],
    creatingUser: user,
    comments: comments,
    user: req.user
  });
});

module.exports = router;
