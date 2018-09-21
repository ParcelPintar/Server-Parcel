import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

let config = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCK,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSENDERID
};

firebase.initializeApp(config);

export const db = firebase.database();
export const auth = firebase.auth();
