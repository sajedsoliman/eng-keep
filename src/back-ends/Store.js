import { useState } from "react";
// Firebase
import { db, firebase } from "./database";

// Helpers - info
import { dicApiReq } from "../helpers/info";
import Helpers from "./HelperFunctions";
import { getDateOnPeriod } from "../helpers/functions";

function Store() {
	// Get the needed helpers function
	const { handleGetImages, handleGetMoreWordInfo, wordDicAbility } = Helpers();

	// State vars
	const [loading, setLoading] = useState(false);
	const [itemsCount, setItemsCount] = useState(null);

	// Get the word list depending on the param (category) for now
	const handleGetWordListOnCategory = (limit, category, setList) => {
		// setLoading(true);

		const categoryQueryRef = db.collection("words").where("category", "==", category);

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
		db.collection("words")
			.get()
			.then((snapshot) => {
				setItemsCount(snapshot.docs.length);
			});

		return db
			.collection("words")
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
			.collection("words")
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

		// Get some images (or 1) from unsplash
		const images = await handleGetImages(wordData.word, 3);

		// Get the (audio src) & more (Synonyms, sentences) the https://dictionaryapi.dev/
		const moreInfo = await handleGetMoreWordInfo(wordData.word);

		// The sentences that I provide must be highlighted, so I provide an extra prop here
		const mySentences = sentences.map((sentence) => ({ ...sentence, userProvided: true }));

		const dbWord = {
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			word,
			category,
			images,
			sentences: [...mySentences],
			synonyms: [...synonyms],
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

		db.collection("words").add(dbWord);
	};

	// Handle delete word by id
	const handleDeleteWord = (id) => {
		db.collection("words").doc(id).delete();
	};

	// Handle update a certain word by id
	const handleUpdateWord = (id, newWordData) => {
		db.collection("words").doc(id).update(newWordData);
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
	};
}

export default Store;
