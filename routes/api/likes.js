var router = require("express").Router();
var Like = require("../../models/Like");

router.get("/", async (req, res) => {
  const likes = await Like.findAll();
  res.json({ likes: likes });
});

router.post("/", async (req, res) => {
  const result = await Like.create(req.body);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const like = await Like.findAll({ where: { id: req.params.id } });
  res.json(like);
});

module.exports = router;
