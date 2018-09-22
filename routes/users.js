const router = require("express").Router();
const User = require("../controllers/user");

router.get("/", User.getAllUsers);

router.post("/register", User.register);

router.post("/login", User.login);

router
	.get("/:id", User.getUserById)
	.delete("/:id", User.remove)
	.patch("/:id", User.updateUser);

module.exports = router;
