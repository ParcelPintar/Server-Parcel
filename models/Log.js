const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = Schema(
	{
		long: {
			type: Schema.Types.Number,
			required: true
		},
		lat: {
			type: Schema.Types.String,
			required: true
		},
		threshold: {
			type: Schema.Types.Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Log", LogSchema);
