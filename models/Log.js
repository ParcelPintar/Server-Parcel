const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = Schema({
	date: {
		type: Schema.Types.Date,
		required: true
	},
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
});

module.exports = mongoose.model("Log", LogSchema);
