const Log = require("../models/Log");
const Order = require("../models/Order");

class LogController {
	static create(req, res) {
		let { long, lat, threshold, parcelId } = req.body;
		Order.findOne({
			parcel: parcelId
		})
			.then(orderFound => {
				if (Object.keys(orderFound).length) {
					return Log.create({
						lat,
						long,
						threshold,
						parcelId,
						orderId: orderFound._id
					});
				} else {
					res.status(404).json({
						error: "Parcel is unavailable"
					});
				}
			})
			.then(logCreated => {
				res.status(201).json({
					message: "log created",
					data: logCreated
				});
			})
			.catch(err => {
				res.status(400).json(err);
			});
	}

	static getAll(req, res) {
		Log.find({})
			.then(logFound => {
				res.status(200).json({
					message: "logs successfully found",
					data: logFound
				});
			})
			.catch(err => {
				res.status(400).json({ error: err.message });
			});
	}

	static getById(req, res) {
		Log.findById(req.params.id)
			.then(logFound => {
				res.status(200).json({
					message: "log successfully found",
					data: logFound
				});
			})
			.catch(err => {
				res.status(400).json({ err: err.message });
			});
	}

	static deleteById(req, res) {
		Log.findByIdAndRemove(req.params.id)
			.then(response => {
				res.status(200).json({
					message: "log successfully deleted",
					data: response
				});
			})
			.catch(err => {
				res.status(400).json({ err: err.message });
			});
	}
}

module.exports = LogController;
