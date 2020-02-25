var router = require("express").Router();
var User = require("../../models/user");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json({ users: users });
});

router.post("/", async (req, res) => {
  const result = await User.create(req.body);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const user = await User.findAll({ where: { id: req.params.id } });
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

function create(user, callback) {
  const mysql = require("mysql2");
  const bcrypt = require("bcrypt");

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return callback(err);

    const insert = {
      password: hash,
      email: user.email,
      nickname: user.nickname
    };

    fetch("http://meme-me-app.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(insert)
    });
  });
}
