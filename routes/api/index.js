var router = require("express").Router();

router.use("/users", require("./users"));
router.use("/memes", require("./memes"));

module.exports = router;
