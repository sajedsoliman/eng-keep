const PATHS = {
	NEW_WORDS: "/new-words",
	PRONUNCIATION: "/properly-pronunciation-words",
	ALL_WORDS: "/",
};

const homepageTabs = [
	{
		label: "all",
		path: PATHS.ALL_WORDS,
	},
	{
		label: "new",
		path: PATHS.NEW_WORDS,
	},
	{
		label: "pronunciation",
		path: PATHS.PRONUNCIATION,
	},
	/* {
		label: "add",
		path: PATHS.ADD_WORD,
	}, */
];

const wordDataInitialValues = {
	word: "",
	category: "new",
	sentences: [],
	synonyms: [],
};

const FORM_LIST_INITIAL_VALUE = { body: "", id: new Date().getTime() };

const WORD_CATEGORIES = ["new", "pronunciation"];

const unsplashApiReq = (query) =>
	`https://api.unsplash.com/search/photos?page=1&per_page=4&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`;

const dicApiReq = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;

export {
	homepageTabs,
	PATHS,
	wordDataInitialValues,
	WORD_CATEGORIES,
	FORM_LIST_INITIAL_VALUE,
	unsplashApiReq,
	dicApiReq,
};
