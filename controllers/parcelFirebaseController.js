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

	static patchParcelById(parcelId, args) {
		let { long, lat, threshold } = args;
		let gps = db.ref("parcels/" + parcelId + "/gps").set({ lat, long });
		let gyro = db
			.ref("parcels/" + parcelId + "/gyro/threshold")
			.set(threshold);
		return Promise.all([gps, gyro]);
	}
}

module.exports = parcelFirebaseController;
