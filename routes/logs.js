const router = require("express").Router();
const logController = require("../controllers/logController");
const logMiddleware = require("../middlewares/LogMiddleware");
router
	.route("/")
	.get(logController.getAll)
	.post(logMiddleware.injectOrderId, logController.create);

router
	.route("/:id")
	.get(logController.getById)
	.delete(logController.deleteById);

module.exports = router;
