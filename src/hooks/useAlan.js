import { useEffect, useState, useCallback, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

// Contexts
import { AuthedUser } from "../contexts/UserContext";

// Components
import Store from "../back-ends/Store";

const COMMANDS = {
	ADD_WORD: "add-word",
};

export default function useAlan() {
	const loggedUser = AuthedUser();

	// Refs
	const alanBtnContainer = useRef();

	const [alanInstance, setAlanInstance] = useState();

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

	useEffect(() => {
		window.addEventListener(COMMANDS.ADD_WORD, addWord);

		return () => {
			window.removeEventListener(COMMANDS.ADD_WORD, addWord);
		};
	}, [addWord]);

	useEffect(() => {
		// Problem: when logged out it doesn't disappear
		if (loggedUser === "no user") {
			document.querySelector(".alanBtn-root")?.remove();
			setAlanInstance(null);
		}
		if (alanInstance != null || loggedUser === "no user") return;

		setAlanInstance(
			alanBtn({
				bottom: "25px",
				right: "25px",
				key: process.env.REACT_APP_ALAN_KEY,
				onCommand: ({ command, payload }) => {
					window.dispatchEvent(new CustomEvent(command, { detail: payload }));
				},
			})
		);
	}, [loggedUser]);

	return null;
}
