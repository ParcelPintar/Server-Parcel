const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
	{
		status: {
			type: Schema.Types.String,
			enum: ["Pickup", "Ongoing", "Completed", "Delayed"],
			required: true,
			default: "Pickup"
		}, // delayed, arrived, etc.
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		address: {
			type: String,
			required: true
		},
		destination: {
			type: {
				type: String, // Don't do `{ location: { type: String } }`
				enum: ["Point"] // 'location.type' must be 'Point'
			},
			coordinates: {
				type: [Number]
			}
		},
		notes: {
			type: String
		}, // other things that might be a concern that related to the deliver,
		parcel: {
			type: Schema.Types.ObjectId,
			ref: "ParcelPintar",
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Order", orderSchema);
