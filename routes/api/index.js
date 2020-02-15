var router = require("express").Router();

router.use("/users", require("./users"));
router.use("/memes", require("./memes"));
router.use("/comments", require("./comments"));

module.exports = router;
