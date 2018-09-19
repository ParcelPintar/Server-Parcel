const router = require("express").Router();

router.get("/", (req, res) => {});

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {});

router
	.route("/:id")
	.get((req, res) => {})
	.delete((req, res) => {})
	.patch((req, res) => {});

module.exports = router;
