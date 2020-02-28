var router = require("express").Router();
var User = require("../../models/user");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json({ users: users });
});

router.post("/", async (req, res) => {
  console.log("DEBUG req.user in post:", req.user);
  req.body.profile_img = req.user.picture;
  const result = await User.create(req.body);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const user = await User.findAll({ where: { id: req.params.id } });
  res.json(user);
});

router.get("/by-email/:email", async (req, res) => {
  const user = await User.findAll({ where: { email: req.params.email } });
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const result = await User.update(req.body, { where: { id: req.params.id } });
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await User.destroy({ where: { id: req.params.id } });
  res.json(result);
});

module.exports = router;
