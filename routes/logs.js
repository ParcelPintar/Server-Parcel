const router = require("express").Router();

router
	.route("/")
	.get()
	.post();

router
	.route("/:id")
	.get()
	.delete();

module.exports = router;
