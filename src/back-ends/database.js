import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDdb4zeZnAteJ_mo9ca4LhRA3kxObF_5TY",
	authDomain: "eng-keep.firebaseapp.com",
	projectId: "eng-keep",
	storageBucket: "eng-keep.appspot.com",
	messagingSenderId: "334104841231",
	appId: "1:334104841231:web:b29af2b95323a37e0e277a",
};

let firebaseInit;
if (!firebase.apps.length) {
	firebaseInit = firebase.initializeApp(firebaseConfig);
} else {
	firebaseInit = firebase.app();
}

const db = firebaseInit.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage, firebase };
