const router = require("express").Router();
const userC = require('../controllers/user');

router.get("/", userC.getAllUsers);

router.post("/register", userC.register);

router.post("/login", userC.login);

router
	.route("/:id")
	.get(userC.getUserById)
	.delete((userC.remove))
	.update((userC.update))

module.exports = router;
