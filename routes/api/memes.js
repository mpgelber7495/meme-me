var router = require("express").Router();
var Meme = require("../../models/Meme");

router
  .route("/")
  .get(async (req, res) => {
    const memes = await Meme.findAll();
    res.json({ memes: memes });
  })
  .post(async (req, res) => {
    const result = await Meme.create(req.body);
    res.json(result);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const meme = await Meme.findAll({ where: { id: req.params.id } });
    res.json(meme);
  })
  .put(async (req, res) => {
    const result = await Meme.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(result);
  })
  .delete(async (req, res) => {
    const result = await Meme.destroy({ where: { id: req.params.id } });
    res.json(result);
  });

module.exports = router;
