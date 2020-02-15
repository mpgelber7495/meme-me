var router = require("express").Router();

router.use("/users", require("./users"));
router.use("/memes", require("./memes"));
router.use("/comments", require("./comments"));
router.use("/likes", require("./likes"));

module.exports = router;
