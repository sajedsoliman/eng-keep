import { useEffect, useState, useCallback } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

// Contexts
import { AuthedUser } from "../contexts/UserContext";

// Components
import Store from "../back-ends/Store";
import { db } from "../back-ends/database";
import { getDateOnPeriod } from "../helpers/functions";

const COMMANDS = {
	ADD_WORD: "add-word",
	SAY_REVISION: "say-revision",
};

export default function useAlan() {
	const loggedUser = AuthedUser();

	const [alanInstance, setAlanInstance] = useState(null);

	// Import store component to handle adding new words
	const { handleAddWord } = Store();

	const addWord = useCallback(
		({ detail }) => {
			const wordData = {
				category: detail.category.toLowerCase(),
				word: detail.word.toLowerCase(),
				sentences: [...detail.sentences],
				synonyms: [],
			};
			handleAddWord(wordData);
		},
		[alanInstance]
	);

	const sayRev = useCallback(
		async ({ detail }) => {
			// Get today's words from Store component
			db.collection("users")
				.doc(loggedUser.id)
				.collection("user-words")
				.where("timestamp", ">=", getDateOnPeriod("today").startDate)
				.orderBy("timestamp", "asc")
				.get()
				.then((snapshot) => {
					const todays_words = snapshot.docs.map((doc) => doc.data());
					todays_words.forEach((wordObj) => {
						const wannaSayExample =
							detail.wannaSayExample === "yes" ? `example: ${wordObj.sentences[0].body}` : "";
						alanInstance.playText(`${wordObj.word}. ${wannaSayExample}`);
					});
				});
		},
		[alanInstance]
	);

	useEffect(() => {
		window.addEventListener(COMMANDS.ADD_WORD, addWord);
		window.addEventListener(COMMANDS.SAY_REVISION, sayRev);

		return () => {
			window.removeEventListener(COMMANDS.ADD_WORD, addWord);
			window.removeEventListener(COMMANDS.SAY_REVISION, sayRev);
		};
	}, [addWord, sayRev]);

	useEffect(() => {
		// Problem: when logged out it doesn't disappear
		if (loggedUser === "no user") {
			document.querySelector(".alanBtn-root")?.remove();
			setAlanInstance(null);
		}

		if (loggedUser === "no user" || alanInstance !== null) return;

		setAlanInstance(
			alanBtn({
				bottom: 15,
				left: 15,
				key: process.env.REACT_APP_ALAN_KEY,
				onCommand: ({ command, payload }) => {
					window.dispatchEvent(new CustomEvent(command, { detail: payload }));
				},
			})
		);
	}, [loggedUser]);

	return alanInstance;
}
