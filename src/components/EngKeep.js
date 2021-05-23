import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router";

// UI
import { Fab, makeStyles, Slide } from "@material-ui/core";
import PopUp from "../common-components/ui/PopUp";
import HomepageTabs from "./HomepageTabs";
import Controls from "../common-components/controls/Controls";

// Icons
import { PlusIcon } from "@heroicons/react/outline";

// Info (from helpers)
import { homepageTabs, PATHS, wordDataInitialValues } from "../helpers/info";

// Components
import Store from "../back-ends/Store";
import WordList from "./word-list/WordList";
import SingleWord from "./single-word/SingleWord";
import WordForm from "../forms/WordForm";
import IF from "../common-components/util/IF";

// Style
const useStyles = makeStyles((theme) => ({
	// word list section
	wordListWrapper: {
		minHeight: "calc(100vh - 48px)" /* 48px - tabs' height */,
		maxHeight: "calc(100vh - 48px)" /* 48px - tabs' height */,
		overflowY: "auto",
		backgroundSize: "cover",
	},
	addNewWordBtn: {
		width: 55,
		height: 55,
		marginBottom: 15,
		position: "fixed",
		bottom: 80,
		right: 25,
		"&:focus": {
			outline: "none",
		},
	},
	addWordFormWrapper: {
		// minWidth: 700,
	},
	verticalMenuToggler: {
		width: 64,
		height: 64,
		"&:focus": {
			outline: "none",
		},
	},
	verticalMenu: {
		position: "fixed",
		bottom: 0,
		left: 0,
		padding: 10,
		borderRadius: 15,
	},
	alanBtnWrapper: {},
}));

export default function EngKeep({ items }) {
	const classes = useStyles();

	// Router
	const location = useLocation();

	// Set the tab depending on the current router path
	const routerTab = homepageTabs.findIndex((tab) => tab.path === location.pathname);

	// State vars
	const [currentTab, setCurrentTab] = useState(routerTab);
	const [wordList, setWordList] = useState([]);
	const [filteredWordList, setFilteredWordList] = useState([]);
	const [addWordPopupOpen, setPopupOpen] = useState(false);
	const [searchText, setSearchText] = useState("");

	// Import Store component to fetch the word list
	const { handleGetWordListOnCategory, handleGetWholeWordList } = Store();

	// Set a listener to track the current tab and fetch the apt data
	useEffect(() => {
		const currPath = location.pathname;

		// If the current page is the (add word) page return null
		if (currPath === PATHS.ADD_WORD) return;

		// get tab's content depending on the current tab
		let unsubscribe = handleGetWholeWordList(setWordList);

		if (currPath !== "/") {
			// Get the category depending on the current tab
			let category = "pronunciation";
			if (currPath === "/new-words") category = "new";

			unsubscribe = handleGetWordListOnCategory(category, setWordList);
		}

		return () => {
			// Stop the onSnapshot listener as the current tab changes
			unsubscribe();

			// Empty the word list
			setWordList([]);
		};
	}, [currentTab]);

	// Set a listener to track the search text and change the list according to it with the respect of the curr category
	useEffect(() => {
		const filteredList = wordList.filter(
			(wordDoc) => wordDoc.word.word.search(searchText.toLowerCase()) !== -1
		);
		setFilteredWordList(filteredList);
	}, [searchText, wordList]);

	// handle change the current tab
	const handleChangeTab = (e, newTab) => {
		setCurrentTab(newTab);
	};

	// handle toggle add word form popup
	const handleTogglePopup = () => {
		setPopupOpen((prev) => !prev);
	};

	// search text change handling
	const handleSearchTextChange = (e) => {
		setSearchText(e.target.value);
	};

	// Tabs component props
	const tabsProps = {
		currentTab,
		handleChangeTab,
		tabs: homepageTabs,
		isWrapped: true,
	};

	// Add word popup props
	const PopUpProps = {
		infoFunc: {
			title: "Add a new word",
			isOpen: addWordPopupOpen,
		},
		closeHandle: handleTogglePopup,
		maxWidth: "sm",
		contentStyles: classes.addWordFormWrapper,
		dividers: true,
	};

	return (
		<main className="bg-gray-100 min-h-screen">
			{/* Tabs themselves */}
			<HomepageTabs {...tabsProps} />

			{/* Each tab content depending on the current tab */}
			<section
				className={`${classes.wordListWrapper} p-4`}
				/* style={{
					background: `url(${
						location.state?.wordData?.images.sort(() => Math.random() - 0.5)[0]
					}) center bottom no-repeat `,
				}} */
			>
				{/* Search Box - if the path is anything but tabs (don't show it) */}
				<IF condition={Object.values(PATHS).includes(location.pathname)}>
					<div className="m-auto w-full md:w-6/12 mb-4">
						<Controls.SearchBox
							fullWidth={true}
							value={searchText}
							handleChange={handleSearchTextChange}
							placeholder="Search for a word. use lower case"
						/>
					</div>
				</IF>

				<Switch>
					<Route path="/" exact>
						<WordList list={filteredWordList} />
					</Route>

					<Route path="/:id" exact>
						<WordList list={filteredWordList} />
					</Route>

					<Route path="/words/:wordName">
						<SingleWord />
					</Route>
				</Switch>
			</section>

			<Fab onClick={handleTogglePopup} color="secondary" className={classes.addNewWordBtn}>
				<PlusIcon className="h-8" />
			</Fab>

			{/* Add word popup */}
			<PopUp {...PopUpProps}>
				<WordForm
					action="add"
					wordData={wordDataInitialValues}
					handleClosePopup={handleTogglePopup}
				/>
			</PopUp>
		</main>
	);
}
