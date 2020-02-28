var router = require("express").Router();
var secured = require("../../utils/secured");

// route for displaying the add meme screen a
router.get("/", secured, async (req, res) => {
  req.user.parsedId = req.user.id.split("|")[1];
  res.render("addMeme", { user: req.user });
});

module.exports = router;
