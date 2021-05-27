import { useEffect, useRef, useState } from "react";
import { Route, Switch, useLocation } from "react-router";

// UI
import { CircularProgress, Fab, makeStyles, Slide } from "@material-ui/core";
import PopUp from "../common-components/ui/PopUp";
import HomepageTabs from "./HomepageTabs";
import Controls from "../common-components/controls/Controls";

// Icons
import { PlusIcon } from "@heroicons/react/outline";

// Info (from helpers)
import {
	DEFAULT_WORD_LIST_LIMIT,
	PATHS,
	wordDataInitialValues,
	homepageTabs,
} from "../helpers/info";

// Util
import IF from "../common-components/util/IF";

// Components
import Store from "../back-ends/Store";
import { WordList } from "./word-list/WordList";
import SingleWord from "./single-word/SingleWord";
import WordForm from "../forms/WordForm";

// Style
const useStyles = makeStyles((theme) => ({
	// word list section
	wordListWrapper: {
		minHeight: "calc(100vh - 48px)" /* 48px - tabs' height */,
		maxHeight: "calc(100vh - 48px)" /* 48px - tabs' height */,
		height: "calc(100vh - 48px)" /* 48px - tabs' height */,
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

export default function EngKeep() {
	const classes = useStyles();

	// Router
	const location = useLocation();

	// Set the tab depending on the current router path
	const routerTab = homepageTabs.findIndex((tab) => tab.path === location.pathname);

	// State vars
	const [currentTab, setCurrentTab] = useState(routerTab);
	const [wordList, setWordList] = useState(null);
	const [filteredWordList, setFilteredWordList] = useState([]);
	const [addWordFormPopupOpen, setPopupOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [period, setPeriod] = useState("today");
	const [limit, setLimit] = useState(DEFAULT_WORD_LIST_LIMIT);

	// Import Store component to fetch the word list
	const { handleGetWordListOnCategory, handleGetWholeWordList, handleGetWordListByDate, loading } =
		Store();

	// Set a listener to track the current tab and fetch the apt data
	useEffect(() => {
		const currPath = location.pathname;

		// get tab's content depending on the current tab
		let unsubscribe = handleGetWholeWordList(limit, setWordList);

		if (currPath !== "/") {
			// Get the category depending on the current tab
			let category = "pronunciation";
			if (currPath === "/new-words") category = "new";

			if (currPath === PATHS.BY_DATE) {
				unsubscribe = handleGetWordListByDate(limit, period, setWordList);
			} else {
				unsubscribe = handleGetWordListOnCategory(limit, category, setWordList);
			}
		}

		return () => {
			// Stop the onSnapshot listener as the current tab changes
			unsubscribe();
		};
	}, [currentTab, period, limit]);

	// Set a listener to reset the limit when the currTab or period gets changed
	useEffect(() => {
		setLimit(DEFAULT_WORD_LIST_LIMIT);
	}, [currentTab, period]);

	useEffect(() => {
		if (wordList !== null) {
			const filteredList = wordList.filter(
				(wordDoc) => wordDoc.word.word.search(searchText) !== -1
			);
			setFilteredWordList(filteredList);
		}
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
		isWrapped: true /* Decide wether the label of the tabs should wrap or not */,
	};

	// Add word popup props
	const PopUpProps = {
		infoFunc: {
			title: "Add a new word",
			isOpen: addWordFormPopupOpen,
		},
		closeHandle: handleTogglePopup,
		maxWidth: "sm",
		contentStyles: classes.addWordFormWrapper,
		dividers: true,
	};

	// handle change period
	const handleChangePeriod = (newPeriod) => {
		setPeriod(newPeriod);
	};

	const wordListComponent = <WordList list={filteredWordList} />;

	return (
		<main className="bg-gray-100 min-h-screen">
			{/* App Tabs => done */}
			<HomepageTabs handleChangePeriod={handleChangePeriod} period={period} {...tabsProps} />

			{/* Each tab content depending on the current tab */}
			<section className={`${classes.wordListWrapper} p-4`}>
				{/* Search Box - if the path is anything but word-listed tabs (all, new, pronunciation) */}
				{/* Anything but a single word page */}
				<IF condition={Object.values(PATHS).includes(location.pathname)}>
					<div className="m-auto w-full md:w-6/12 mb-4">
						<Controls.SearchBox
							fullWidth={true}
							value={searchText}
							handleChange={handleSearchTextChange}
							placeholder="Search for a word"
						/>
					</div>
				</IF>

				{/* a switch to move between tabs */}
				<Switch>
					<Route path="/" exact>
						{wordListComponent}
					</Route>

					<Route path="/:id" exact>
						{wordListComponent}
					</Route>

					<Route path="/words/:word">
						<SingleWord />
					</Route>
				</Switch>

				{/* Loading indicator - disabled for now */}
			</section>

			{/* Add word form's toggler */}
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
