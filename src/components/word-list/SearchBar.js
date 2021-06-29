// UI
import Controls from "../../common-components/controls/Controls";

function SearchBar({ query, handleChangeQuery }) {
	return (
		<div className="m-auto w-full md:w-6/12 mb-4">
			<Controls.SearchBox
				fullWidth={true}
				value={query}
				handleChange={handleChangeQuery}
				placeholder="Search for a word"
			/>
		</div>
	);
}

export default SearchBar;
