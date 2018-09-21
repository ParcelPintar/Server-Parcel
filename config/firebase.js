var admin = require("firebase-admin");

var serviceAccount = require("./parcelpintar-firebase-adminsdk-67zwo-17b3732d9e.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://parcelpintar.firebaseio.com"
});

module.exports = {
	db: admin.database()
};
