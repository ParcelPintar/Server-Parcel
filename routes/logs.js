const router = require("express").Router();
const logController = require("../controllers/logController");
router
	.route("/")
	.get(logController.getAll)
	.post(logController.create);

router
	.route("/:id")
	.get(logController.getById)
	.delete(logController.deleteById);

module.exports = router;
