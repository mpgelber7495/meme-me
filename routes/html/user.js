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
  //   for (let i = 0; i < comments.length; i++) {
  //     let likes = await Like.findAll({
  //       where: { CommentId: comments[i].id },
  //       raw: true
  //     });
  //     var likesLength = likes.filter(function(element) {
  //       return element.up_or_down == 1;
  //     });
  //     var dislikesLength = likes.filter(function(element) {
  //       return element.up_or_down == 0;
  //     });

  //     comments[i].likesArray = likes;
  //     comments[i].likes = likesLength.length;
  //     comments[i].dislikes = dislikesLength.length;
  //     let user = await User.findAll({
  //       where: { id: comments[i].UserId },
  //       raw: true
  //     });
  //     comments[i].user = user[0].nickname;
  //   }
  //   let likes = await Like.findAll({
  //     where: { MemeId: req.params.id },
  //     raw: true
  //   });
  console.log("USER:: ", user);
  console.log("COMMENTS:: ", comments);
  console.log("LIKES::", comments[0].likes);
  //   console.log("LIKES:: ", likes);
  console.log(user[0]);
  res.render("userById", {
    memes: memes,
    // creatingUser: user,
    comments: comments
  });
});

module.exports = router;
