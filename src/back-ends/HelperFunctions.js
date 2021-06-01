// Firebase
import { db, storage } from "./database";

// info
import { dicApiReq, unsplashApiReq } from "../helpers/info";

function Helpers() {
	// Handle get images depending on the given word
	const handleGetImages = async (word, imagesCount = 3) => {
		const res = await fetch(unsplashApiReq(word));
		const data = await res.json();
		const results = data.results;

		return results.slice(0, imagesCount).map((image) => image.urls.small);
	};

	// handle get synonyms & sentences & the audio arc from the https://dictionaryapi.dev/ website
	const handleGetMoreWordInfo = async (word) => {
		const res = await fetch(dicApiReq(word));
		const data =
			await res.json(); /* Return an array of words, so I need to target the first one below */
		const wordObj = data[0];
		if (wordObj === undefined) return "word does not exist";

		const audioSrc = wordObj.phonetics.length != 0 ? wordObj.phonetics[0].audio : "";
		const definitions = wordObj.meanings.map((meaning) => meaning.definitions).flat();
		const exampleSentences = [];
		const synonyms = [];

		definitions.forEach((definition) => {
			const example = definition.example;
			const synms = definition.synonyms;
			// Get example sentences
			if (example != undefined || example != null) {
				exampleSentences.push({
					body: example,
					id: new Date().getTime() * Math.random(),
				});
			}
			// Get synonyms
			if (synms != undefined || synms != null) {
				synonyms.push(synms);
			}
		});

		// get the audio src for each synonym
		const fullSynonyms = synonyms.flat().map((syn) => ({
			body: syn,
			id: new Date().getTime() * Math.random(),
		}));

		return {
			audioSrc,
			synonyms: fullSynonyms,
			sentences: exampleSentences,
		};
	};

	// Check words ability to be fetched from the https://dictionaryapi.dev/ api
	const wordDicAbility = async (word) => {
		const res = await fetch(dicApiReq(word));
		const data =
			await res.json(); /* Return an array of words, so I need to target the first one below */
		const wordObj = data[0];
		if (wordObj === undefined) return false;

		return true;
	};

	// handle add the user to db
	const addUserToDb = (userInfo) => {
		db.collection("users").doc(userInfo.id).set(userInfo);
	};

	// handle upload a user avatar
	const handleUploadUserAvatar = async (avatar) => {
		// 1. upload the avatar
		await storage.ref(`users-avatar/${avatar.name}`).put(avatar);

		// return the download url
		return storage
			.ref("users-avatar")
			.child(avatar.name)
			.getDownloadURL()
			.then((url) => url);
	};

	return {
		handleGetImages,
		handleGetMoreWordInfo,
		wordDicAbility,
		addUserToDb,
		handleUploadUserAvatar,
	};
}

export default Helpers;
