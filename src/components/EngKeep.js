import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import UnAuthRoute from "../common-components/router/UnAuthRoute";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../redux/reducers/globals";

// UI
import { IconButton, makeStyles } from "@material-ui/core";
import HomepageTabs from "./HomepageTabs";

// Icons
import { ArrowDownIcon } from "@heroicons/react/outline";

// Info (from helpers)
import {
	DEFAULT_WORD_LIST_LIMIT,
	PATHS,
	homepageTabs,
	NON_SEARCHABLE_PATHS,
} from "../helpers/info";

// Util
import IF from "../common-components/util/IF";

// Contexts
import { AuthedUser } from "../contexts/UserContext";

// Pages
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

// Components
import Header from "./header/Header";
import Store from "../back-ends/Store";
import { WordList } from "./word-list/WordList";
import SearchBar from "./word-list/SearchBar";
import AddWordToggler from "./AddWordToggler";
import ScrollTopButton from "./ScrollTopButton";

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
	const loggedUser = AuthedUser();

	// Refs
	const wordListRef = useRef();

	// Router
	// const history = useHistory();
	const routerLocation = useLocation();

	// Set the tab depending on the current router path
	const routerTab = homepageTabs.findIndex((tab) => tab.path === routerLocation.pathname);

	// State vars
	const [currentTab, setCurrentTab] = useState(routerTab);
	const [wordList, setWordList] = useState(null);
	const [filteredWordList, setFilteredWordList] = useState([]);
	const [period, setPeriod] = useState("today");
	const [limit, setLimit] = useState(DEFAULT_WORD_LIST_LIMIT);

	// Import Store component to fetch the word list
	const { handleGetWordListOnCategory, handleGetWholeWordList, handleGetWordListByDate } = Store();

	// Redux
	const dispatch = useDispatch();
	const { searchText: query } = useSelector((state) => state.globals);

	// set a listener to get the last opened word (in localStorage) to scroll to it
	useLayoutEffect(() => {
		const lastScroll = localStorage.getItem("last-scroll");
		const lastLimit = localStorage.getItem("last-limit");
		const lastPeriod = localStorage.getItem("last-period");
		const inWordListPage = routerLocation.pathname.search("/word") == -1;
		if (lastScroll !== null && inWordListPage) {
			wordListRef.current.scroll({ top: lastScroll });

			if (lastLimit !== null) {
				setLimit(parseInt(lastLimit));
			} else {
				localStorage.removeItem("last-scroll");
			}
			if (lastPeriod === null) {
				localStorage.removeItem("last-limit");
			}
			if (lastPeriod !== null) {
				setPeriod(lastPeriod);
				localStorage.removeItem("last-period");
			}
		}
	}, [routerLocation.pathname, filteredWordList, limit]);

	// Set a listener to track the current tab and fetch the apt data
	useEffect(() => {
		// Don't call the api if there is no user
		if (loggedUser === "no user") return setWordList([]);

		const currPath = routerLocation.pathname;

		// get tab's content depending on the current tab
		let unsubscribe;

		if (currPath !== "/") {
			// Get the category depending on the current tab
			let category = "pronunciation";
			if (currPath === "/new-words") category = "new";

			if (currPath === PATHS.BY_DATE) {
				unsubscribe = handleGetWordListByDate(limit, period, setWordList);
			} else {
				unsubscribe = handleGetWordListOnCategory(limit, category, setWordList);
			}
		} else {
			unsubscribe = handleGetWholeWordList(limit, setWordList);
		}

		return () => {
			// Stop the onSnapshot listener as the current tab changes
			unsubscribe();
		};
	}, [currentTab, period, loggedUser]);

	// Set a listener to reset the limit when the currTab or period gets changed
	useEffect(() => {
		// Reset Search text (query)
		dispatch(updateSearch(""));

		// Reset the limit
		if (localStorage.getItem("last-scroll") === null) {
			setLimit(DEFAULT_WORD_LIST_LIMIT);
		}

		// Scroll to the top
		wordListRef.current.scroll(0, 0);
	}, [currentTab, period]);

	useEffect(() => {
		if (wordList !== null) {
			const wordRegex = new RegExp(query, "i");
			const filteredList = wordList.filter((wordDoc) => wordDoc.word.word.search(wordRegex) !== -1);
			setFilteredWordList(filteredList);
		}
	}, [query, wordList]);

	// handle change the current tab
	const handleChangeTab = (e, newTab) => {
		setCurrentTab(newTab);
	};

	// Tabs component props
	const tabsProps = {
		currentTab,
		handleChangeTab,
		isWrapped: true /* Decide wether the label of the tabs should wrap or not */,
	};

	// handle change period
	const handleChangePeriod = (newPeriod) => {
		setPeriod(newPeriod);
	};

	// user logged in condition
	const isUserLogged = loggedUser !== "no user";

	// there are more results condition
	const thereMore = limit < filteredWordList.length;

	// there are results
	const haveResult = filteredWordList.length > 0;

	// search box display conditions
	const isSearchDisplay =
		Object.values(PATHS).includes(routerLocation.pathname) &&
		isUserLogged &&
		wordList?.length !== 0;

	// Word list component
	const wordListComponent = (
		<WordList
			listRef={wordListRef}
			list={filteredWordList.slice(0, limit)}
			period={period}
			limit={limit}
		/>
	);

	return (
		<main className="bg-gray-100 min-h-screen">
			{/* App header for signin and register */}
			<Header />

			{/* App Tabs => done */}
			<HomepageTabs handleChangePeriod={handleChangePeriod} period={period} {...tabsProps} />

			{/* Each tab content depending on the current tab */}
			<Switch>
				<section ref={wordListRef} className={`${classes.wordListWrapper} p-4`}>
					{/* A message to display if the user is not logged in */}
					<IF
						condition={
							!isUserLogged &&
							// This condition is to hide the search bar in signin & register pages
							!Object.values(NON_SEARCHABLE_PATHS).includes(routerLocation.pathname)
						}
					>
						<h2 className="font-medium text-lg text-center">Log in to add &amp; see words</h2>
					</IF>

					{/* Search Box - if the path is anything but word-listed tabs (all, new, pronunciation) */}
					{/* Anything but a single word page */}
					<IF condition={isSearchDisplay}>
						<SearchBar />
					</IF>

					{/* a switch to move between tabs */}

					<Route path="/" exact>
						{wordListComponent}
					</Route>

					<UnAuthRoute path="/register">
						<Register />
					</UnAuthRoute>

					<UnAuthRoute path="/signin">
						<Login />
					</UnAuthRoute>

					<Route path="/:id" exact>
						{wordListComponent}
					</Route>

					{/* Load more button */}
					<IF
						condition={
							// The third condition is for single page
							thereMore && haveResult && Object.values(PATHS).includes(routerLocation.pathname)
						}
					>
						<div className="text-center mt-3">
							<IconButton onClick={() => setLimit((prev) => prev + DEFAULT_WORD_LIST_LIMIT)}>
								<ArrowDownIcon className="h-5 text-blue-600" />
							</IconButton>
						</div>
					</IF>
				</section>
			</Switch>

			{/* Scroll to top button */}
			<ScrollTopButton wordListRef={wordListRef} />

			{/* New word form */}
			<AddWordToggler />
		</main>
	);
}
