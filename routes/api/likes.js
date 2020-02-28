var router = require("express").Router();
var Like = require("../../models/like");

router.get("/", async (req, res) => {
  const likes = await Like.findAll();
  res.json({ likes: likes });
});

router.post("/", async (req, res) => {
  console.log(req.user);
  if (req.user) {
    let userId = req.user.id.split("|")[1];
    req.body.UserId = userId;
    const duplicateLikes = await Like.findAll({
      where: { UserId: userId, CommentId: req.body.CommentId },
      raw: true
    });
    for (let i = 0; i < duplicateLikes.length; i++) {
      if (duplicateLikes[i].up_or_down == req.body.up_or_down) {
        return res.status(300);
      }
    }
    const result = await Like.create(req.body);
    res.json(result);
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    const like = await Like.findAll({ where: { id: req.params.id } });
    res.json(like);
  })
  .put(async (req, res) => {
    const result = await Like.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(result);
  })
  .delete(async (req, res) => {
    const result = await Like.destroy({ where: { id: req.params.id } });
    res.json(result);
  });

module.exports = router;
