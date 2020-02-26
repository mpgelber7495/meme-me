var router = require("express").Router();

// route for displaying the add meme screen a
router.get("/", async (req, res) => {
  let userInfo = await req.user;
  console.log(userInfo);
  res.render("addMeme", { user: req.user });
});

module.exports = router;
