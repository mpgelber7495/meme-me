var router = require("express").Router();
var Meme = require("../../models/Comment");

router.get("/", async (req, res) => {
  const comments = await Comment.findAll();
  res.json({ comments: comments });
});

router.post("/", async (req, res) => {
  const result = await Comment.create(req.body);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const comment = await Comment.findAll({ where: { id: req.params.id } });
  res.json(comment);
});

module.exports = router;
