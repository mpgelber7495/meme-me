var router = require("express").Router();
var Meme = require("../models/meme");

router.use("/api", require("./api"));
router.route("/").get(async (req, res) => {
  const memes = await Meme.findAll();
  res.render("home", { memes: memes });
});
module.exports = router;
