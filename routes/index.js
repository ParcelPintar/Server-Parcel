const express = require('express');
const router = express.Router();
const ordersRouter = require("./orders");
const usersRouter = require("./users");
const parcelsRouter = require("./parcels");
const gyrosRouter = require("./gyro");
const gpsRouter = require("./gps");

router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
router.use("/parcels", parcelsRouter);
router.use("/gyro", gyrosRouter);
router.use("/gps", gpsRouter);

router.use("/", (req, res) => {
	res.send("Welcome to ParcelPintar API");
});

module.exports = router;
