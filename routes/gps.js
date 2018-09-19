const router = require("express").Router();
const GPS = require('../controllers/gps');

router
	.route("/")
	.get(GPS.getAllGPS)
	.post(GPS.create);

router
	.route("/:id")
	.get(GPS.getGPSById)
	.delete(GPS.remove)
	.patch(GPS.updateGPS);

module.exports = router;
