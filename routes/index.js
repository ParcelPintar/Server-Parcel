const router = require("express").Router();
const ordersRouter = require("./orders");
const usersRouter = require("./users");
const parcelsRouter = require("./parcels");

router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
router.use("/parcels", parcelsRouter);

router.use("/", (req, res) => {
	res.send("Welcome to ParcelPintar API");
});

module.exports = router;
