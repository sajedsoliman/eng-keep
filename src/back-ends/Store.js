import { useState } from "react";

// Router
import { useHistory } from "react-router-dom";

// Firebase
import { db, auth, firebase, storage } from "./database";

// Helpers - info
import { dicApiReq } from "../helpers/info";
import Helpers from "./HelperFunctions";
import { getDateOnPeriod } from "../helpers/functions";

// Contexts
import { AuthedUser } from "../contexts/UserContext";

function Store() {
	const loggedUser = AuthedUser();

	// Get the needed helpers function
	const {
		handleGetImages,
		handleGetMoreWordInfo,
		wordDicAbility,
		addUserToDb,
		handleUploadUserAvatar,
	} = Helpers();

	// Router
	const history = useHistory();

	// State vars
	const [loading, setLoading] = useState(false);
	const [itemsCount, setItemsCount] = useState(null);

	// For logged user - start
	// Get the word list depending on the param (category) for now
	const handleGetWordListOnCategory = (limit, category, setList) => {
		const categoryQueryRef = db
			.collection("users")
			.doc(loggedUser.id)
			.collection("user-words")
			.where("category", "==", category);

		// Get words available count
		categoryQueryRef.get().then((snapshot) => {
			setItemsCount(snapshot.docs.length);
		});

		return categoryQueryRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
			const words = snapshot.docs.map((doc) => ({ id: doc.id, word: doc.data() }));

			setList(words);
			// setLoading(false);
		});
	};

	// Get the whole word list
	const handleGetWholeWordList = (limit, setList) => {
		// setLoading(true);

		// Get words available count
		db.collection("users")
			.doc(loggedUser.id)
			.collection("user-words")
			.get()
			.then((snapshot) => {
				setItemsCount(snapshot.docs.length);
			});

		return db
			.collection("users")
			.doc(loggedUser.id)
			.collection("user-words")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				const words = snapshot.docs.map((doc) => ({ id: doc.id, word: doc.data() }));

				setList(words);
				// setLoading(false);
			});
	};

	// get word list depends on the given period
	const handleGetWordListByDate = (limit, period, setList) => {
		// setLoading(true);

		const startDate = getDateOnPeriod(period).startDate;
		// Which is today - endDate
		const endDate = getDateOnPeriod(period).endDate;

		const dateQueryRef = db
			.collection("users")
			.doc(loggedUser.id)
			.collection("user-words")
			.where("timestamp", ">=", startDate)
			.where("timestamp", "<=", endDate)
			.orderBy("timestamp", "desc");

		// Get words available count
		dateQueryRef.get().then((snapshot) => {
			setItemsCount(snapshot.docs.length);
		});

		return dateQueryRef.onSnapshot((snapshot) => {
			const words = snapshot.docs.map((doc) => ({ id: doc.id, word: doc.data() }));

			setList(words);
			// setLoading(false);
		});
	};
	// For logged user - end

	// Get audio src for a given word
	const handleGetAudioSrc = async (word) => {
		const res = await fetch(dicApiReq(word));
		const data =
			await res.json(); /* Return an array of words, so I need to target the first one below */
		const wordObj = data[0];
		const phonetic =
			wordObj !== undefined && wordObj.phonetics.length !== 0 ? wordObj.phonetics[0] : null;

		return phonetic === null ? "" : phonetic.audio;
	};

	// Handle add word to db - and will be used with AI
	const handleAddWord = async (wordData) => {
		const { word, category, sentences, synonyms } = wordData;

		// The sentences that I provide must be highlighted, so I provide an extra prop here
		const mySentences = sentences.map((sentence) => ({ ...sentence, userProvided: true }));

		let dbWord = {
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			word,
			category,
			images: [],
			sentences: [...mySentences],
			synonyms: [...synonyms],
		};
		// If the category is idiom we don't need: images and more info

		if (category !== "phrase") {
			// Get some images (or 1) from unsplash
			const images = await handleGetImages(wordData.word, 3);

			// Get the (audio src) & more (Synonyms, sentences) the https://dictionaryapi.dev/
			const moreInfo = await handleGetMoreWordInfo(wordData.word);

			dbWord = {
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				word,
				category,
				images,
				...(moreInfo === "word does not exist"
					? {
							sentences: [...mySentences],
							synonyms: [...synonyms],
							wordAudio: "",
					  }
					: {
							sentences: [...moreInfo.sentences, ...mySentences],
							synonyms: [...synonyms, ...moreInfo.synonyms],
							wordAudio: moreInfo.audioSrc,
					  }),
			};
		}

		db.collection("users").doc(loggedUser.id).collection("user-words").add(dbWord);
	};

	// Handle delete word by id
	const handleDeleteWord = (id) => {
		db.collection("users").doc(loggedUser.id).collection("user-words").doc(id).delete();
	};

	// Handle update a certain word by id
	const handleUpdateWord = (id, newWordData) => {
		db.collection("users").doc(loggedUser.id).collection("user-words").doc(id).update(newWordData);
	};

	// Handle register a user
	const handleRegisterUser = async (userInfo) => {
		// destructuring the user
		let { avatar, fullName, email, password } = userInfo;

		// set loading
		setLoading(true);

		// Auth the user
		const newUser = auth.createUserWithEmailAndPassword(email, password);

		// Check for the avatar
		if (avatar != null || avatar != undefined) {
			// handle upload the avatar
			avatar = await handleUploadUserAvatar(avatar);
		}

		// Update the user's fullName and avatar
		newUser.then((authUser) => {
			const dbUser = {
				fullName,
				email,
				avatar: avatar,
				id: authUser.user.uid,
			};
			addUserToDb(dbUser);

			// Stop the loading progress
			setLoading(false);

			authUser.user.updateProfile({
				displayName: fullName,
				photoURL: avatar,
			});
		});
	};

	// Handle signin a user
	const handleSignin = (email, password) => {
		// set loading

		auth
			.signInWithEmailAndPassword(email, password)
			.then((loggedUser) => {
				// Go to home - if there is from page => go to it
				history.replace("/");
			})
			.catch((error) => alert(error.message));
	};

	// handle sign out
	const handleSignOut = () => {
		auth.signOut().then(() => {
			// Go to login page
			history.replace("/signin");
		});
	};

	return {
		handleGetWordListOnCategory,
		handleGetWholeWordList,
		handleAddWord,
		handleGetAudioSrc,
		handleDeleteWord,
		handleUpdateWord,
		wordDicAbility,
		handleGetWordListByDate,
		loading,
		itemsCount,
		handleRegisterUser,
		handleSignin,
		handleSignOut,
	};
}

export default Store;
