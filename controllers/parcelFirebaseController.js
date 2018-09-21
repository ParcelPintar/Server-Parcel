const { db } = require("../config/firebase");

class parcelFirebaseController {
	constructor() {}

	static createNewParcel(newParcelId) {
		return db
			.ref("parcels/")
			.child(newParcelId)
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

	static getParcelById(parcelId) {
		return new Promise((resolve, reject) => {
			db.ref("parcels/" + parcelId)
				.once("value")
				.then(data => {
					resolve(data.val());
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	static getParcelGPSById(parcelId){
		return new Promise((resolve, reject)=>{
			this.getParcelById(parcelId).then(data=>{
				resolve(data.gps);
			})
			.catch(err){
				reject(err);
			}
		})
	}

	static getParcelGyroById(parcelId){
		return new Promise((resolve, reject)=>{
			this.getParcelById(parcelId).then(data=>{
				resolve([data.gps.long, data.gps.lat])
			})
			.catch(err=>{
				reject(err)
			})
		})
	}

	static deleteParcelById(parcelId){
		return db.ref("parcels/"+parcelId).set(null)
	}
}

module.exports = parcelFirebaseController;
