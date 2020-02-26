var router = require("express").Router();
var Meme = require("../../models/meme");

router.get("/:id", async (req, res) => {
  let meme = await Meme.findAll({ where: { id: req.params.id }, raw: true });
  console.log(meme[0]);
  res.render("memeById", meme[0]);
});

module.exports = router;
