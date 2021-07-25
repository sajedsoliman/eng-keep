// UI
import { Button } from "@material-ui/core";
import Controls from "../../common-components/controls/Controls";

function SearchBar({
	query,
	handleChangeQuery,
	setFilteredList,
	wordList,
	setLimit,
}) {
	const handleGoToWord = () => {
		const goToWord = query === "" ? localStorage.getItem("last-word") : query;

		const queryIndex =
			wordList.findIndex(({ word }) => word.word === goToWord) + 1;
		setLimit(queryIndex + 1);
		setFilteredList(wordList);

		window.location.href = `/#${goToWord}`;

		// save it to localStorage if it's new
		if (query !== "") localStorage.setItem("last-word", query);
	};

	const goButtonLabel = query === "" ? "to last word" : "";

	return (
		<div className="flex m-auto w-full md:w-6/12 mb-4 space-x-1">
			<div style={{ flex: 2 }}>
				<Controls.SearchBox
					fullWidth
					value={query}
					handleChange={handleChangeQuery}
					placeholder="Search for a word or type a word and click go to scroll down to it"
				/>
			</div>

			<Button
				onClick={handleGoToWord}
				variant="outlined"
				color="primary"
				size="small"
				fullWidth
				style={{ flex: 1 }}
			>
				Go {goButtonLabel}
			</Button>
		</div>
	);
}

export default SearchBar;
