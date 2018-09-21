const Parcel = require("../models/ParcelPintar");
const parcelFirebaseController = require("../controllers/parcelFirebaseController");

class ParcelController {
	constructor() {}

	static create(req, res) {
		Parcel.create()
			.then(newParcel => {
				parcelFirebaseController.createNewParcel(newParcel.id);
				res.status(201).json(newParcel);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getParcelById(req, res) {
		let parcelId = req.params.id;

		Parcel.findById(parcelId)
			.then(parcelFound => {
				if (parcelFound) {
					res.status(200).json(parcelFound);
				} else {
					res.status(404).json({
						error: "Parcel not found"
					});
				}
			})
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getAllParcels(req, res) {
		Parcel.find()
			.then(parcels => {
				res.status(200).json(parcels);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static updateParcel(req, res) {
		let parcelId = req.params.id;
		const { long, lat, threshold } = req.body;

		Parcel.findByIdAndUpdate(parcelId, {
			$set: { gyro: { threshold }, gps: { location: { long, lat } } }
		})
			.then(updatedParcel => {
				res.status(200).json(updatedParcel);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static remove(req, res) {
		let parcelId = req.params.id;

		Parcel.findByIdAndRemove(parcelId)
			.then(removedParcel => {
				parcelFirebaseController.deleteParcelById(parcelId);
				res.status(200).json(removedParcel);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}
}

module.exports = ParcelController;
