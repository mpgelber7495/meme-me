var router = require("express").Router();
var Comment = require("../../models/Comment");

router
  .route("/")
  .get(async (req, res) => {
    const comments = await Comment.findAll();
    res.json({ comments: comments });
  })
  .post(async (req, res) => {
    const result = await Comment.create(req.body);
    res.json(result);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const comment = await Comment.findAll({ where: { id: req.params.id } });
    res.json(comment);
  })
  .put(async (req, res) => {
    const result = await Comment.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(result);
  })
  .delete(async (req, res) => {
    const result = await Comment.destroy({ where: { id: req.params.id } });
    res.json(result);
  });

module.exports = router;
