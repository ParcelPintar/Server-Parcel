const { db } = require("../config/firebase");

class parcelFirebaseController {
	constructor() {}

	static createNewParcel(newParcelId) {
		return db
			.ref("parcels/")
			.child(String(newParcelId))
			.set({
				gyro: {
					threshold: false
				},
				gps: {
					long: 0,
					lat: 0
				}
			});
	}

	static deleteParcelById(parcelId) {
		return db.ref("parcels/" + parcelId).set(null);
	}
}

module.exports = parcelFirebaseController;
