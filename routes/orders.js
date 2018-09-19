const router = require("express").Router();

router
	.route("/")
	.get((req, res) => {})
	.post((req, res) => {});

router
	.route("/:id")
	.get((req, res) => {})
	.delete((req, res) => {})
	.patch((req, res) => {});

router.get("/me/receive", (req, res) => {});

router.get("/me/send", (req, res) => {});

module.exports = router;
