const router = require("express").Router();
const Parcel = require('../controllers/parcel');

router
	.route("/")
	.get(Parcel.getAllParcels)
	.post(Parcel.create);

router
	.route("/:id")
	.get(Parcel.getParcelById)
	.delete(Parcel.remove)
	.update(Parcel.update);

module.exports = router;