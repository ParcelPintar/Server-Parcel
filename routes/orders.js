const router = require("express").Router();
const Order = require("../controllers/order");

router
	.route("/")
	.get(Order.getAllOrders)
	.post(Order.create);

router
	.route("/:id")
	.get(Order.getOrderById)
	.delete(Order.remove)
	.patch(Order.updateOrder);

router.get("/me/receive", Order.getReceiveOrder);

router.get("/me/send", Order.getSendOrder);

module.exports = router;
