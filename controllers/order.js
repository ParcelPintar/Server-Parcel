const Order = require("../models/Order");

class OrderController {
	static create(req, res) {
		const { receiver, address, destination, notes, parcel } = req.body;
		const sender = req.headers.userId;

		Order.create({
			sender,
			receiver,
			address,
			destination,
			notes,
			parcel
		})
			.then(newOrder => {
				res.status(201).json(newOrder);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getOrderById(req, res) {
		let orderId = req.params.id;

		Order.findOne(orderId)
			.then(orderFound => {
				if (orderFound) {
					res.status(200).json(orderFound);
				} else {
					res.status(404).json({
						error: "Order not found"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getAllOrders(req, res) {
		Order.find({})
			.then(orders => {
				res.status(200).json(orders);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getSendOrder(req, res) {
		let userId = req.headers.userId;

		Order.find({ sender: userId })
			.then(orders => {
				res.status(200).json(orders);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getReceiveOrder(req, res) {
		let userId = req.headers.userId;

		Order.find({ receiver: userId })
			.then(orders => {
				res.status(200).json(orders);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static updateOrder(req, res) {
		let orderId = req.params.id;
		let userId = req.headers.userId;

		Order.findOneAndUpdate(
			{ _id: orderId, sender: userId },
			{ $set: req.body },
			{ new: true }
		)
			.then(updatedOrder => {
				res.status(200).json(updatedOrder);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static remove(req, res) {
		let orderId = req.params.id;

		Order.findByIdAndRemove(orderId)
			.then(removedOrder => {
				res.status(200).json(removedOrder);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}
}

module.exports = OrderController;
