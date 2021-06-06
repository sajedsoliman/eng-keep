// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../../redux/reducers/globals";

// UI
import Controls from "../../common-components/controls/Controls";

function SearchBar() {
	// Redux
	const dispatch = useDispatch();
	const { searchText: query } = useSelector((state) => state.globals);

	return (
		<div className="m-auto w-full md:w-6/12 mb-4">
			<Controls.SearchBox
				fullWidth={true}
				value={query}
				handleChange={(e) => dispatch(updateSearch(e.target.value))}
				placeholder="Search for a word"
			/>
		</div>
	);
}

export default SearchBar;
