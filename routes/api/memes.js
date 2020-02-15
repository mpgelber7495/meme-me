var router = require("express").Router();
var Meme = require("../../models/Meme");

router.get("/", async (req, res) => {
  const memes = await Meme.findAll();
  res.json({ memes: memes });
});

router.post("/", async (req, res) => {
  const result = await Meme.create(req.body);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const meme = await Meme.findAll({ where: { id: req.params.id } });
  res.json(meme);
});

module.exports = router;
