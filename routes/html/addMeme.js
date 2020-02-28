var router = require("express").Router();
var secured = require("../../utils/secured");

// route for displaying the add meme screen a
router.get("/", secured, async (req, res) => {
  let userInfo = await req.user;
  console.log(userInfo);
  res.render("addMeme", { user: req.user });
});

module.exports = router;
