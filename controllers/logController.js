const Log = require("../models/Log");
const Order = require("../models/Order");
const {
	createAndSendEmail,
	prepareEmail,
	sendEmail
} = require("../libs/mailModule");

class LogController {
	static create(req, res) {
		let { long, lat, threshold, parcelId } = req.body;
		Order.findOne({
			parcel: parcelId
		})
			.populate("sender")
			.then(orderFound => {
				createAndSendEmail(
					orderFound.sender.email,
					"alert",
					orderFound.sender.name
				);
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
		Log.find({}).then(logFound => {
			res.status(200).json({
				message: "logs successfully found",
				data: logFound
			});
		});
	}
}

module.exports = LogController;
