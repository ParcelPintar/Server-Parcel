const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelPintarSchema = Schema({
	gyro: {
		threshold: {
			type: Schema.Types.Boolean,
			default: false
		}
	},
	gps: {
		location: {
			long: {
				type: String,
				required: true,
				default: "-6.0988"
			},
			lat: {
				type: String,
				required: true,
				default: "106"
			}
		}
	}
});

module.exports = mongoose.model("ParcelPintar", parcelPintarSchema);
