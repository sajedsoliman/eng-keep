const PATHS = {
	NEW_WORDS: "/new-words",
	PRONUNCIATION: "/properly-pronunciation-words",
	ALL_WORDS: "/",
	BY_DATE: "/sort-by-date",
};

const NON_SEARCHABLE_PATHS = {
	REGISTER: "/register",
	SIGN_IN: "/signin",
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
	{
		label: "sort by date",
		path: PATHS.BY_DATE,
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

const WORD_CATEGORIES = ["new", "pronunciation", "phrase"];

const unsplashApiReq = (query) =>
	`https://api.unsplash.com/search/photos?page=1&per_page=4&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`;

const dicApiReq = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;

const DATE_SORTING_PERIODS = [
	{
		label: "Today",
		period: "today",
	},
	{
		label: "Yesterday",
		period: "yesterday",
	},
	{
		label: "Last Week",
		period: "last-week",
	},
	{
		label: "Last Month",
		period: "last-month",
	},
];

const DEFAULT_WORD_LIST_LIMIT = window.innerWidth < 700 ? 5 : 12;

const USER_SIGNIN_INITIAL_VALUES = {
	email: "",
	password: "",
};

const USER_REGISTER_INITIAL_VALUES = {
	...USER_SIGNIN_INITIAL_VALUES,
	fullName: "",
};

export {
	homepageTabs,
	PATHS,
	wordDataInitialValues,
	WORD_CATEGORIES,
	FORM_LIST_INITIAL_VALUE,
	unsplashApiReq,
	dicApiReq,
	DATE_SORTING_PERIODS,
	DEFAULT_WORD_LIST_LIMIT,
	NON_SEARCHABLE_PATHS,
	USER_REGISTER_INITIAL_VALUES,
	USER_SIGNIN_INITIAL_VALUES,
};
