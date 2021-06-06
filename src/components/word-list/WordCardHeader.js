import { Link as RouterLink, useLocation } from "react-router-dom";

// UI
import { Fade } from "@material-ui/core";

// Icons
import { VolumeUpIcon } from "@heroicons/react/outline";

// Util
import IF from "../../common-components/util/IF";

function WordCardHeader({ wordData, id, audioRef, wordImage, listRef }) {
	// Import router location to add the word's category if as denoted in the condition below
	const location = useLocation();

	// Check if the category is idiom or phrase
	const isPhrase = wordData.category === "phrase";

	return (
		<Fade in={!Boolean(wordImage)}>
			<header className="flex items-center">
				<IF condition={!isPhrase}>
					<VolumeUpIcon
						onClick={() => audioRef.current.play()}
						className="h-5 mr-2 text-red-400 cursor-pointer"
					/>
				</IF>
				<RouterLink
					className={`flex-1 bg-gray-100 rounded-md capitalize ${isPhrase ? "pr-1" : "pl-1"}`}
					onClick={() => {
						localStorage.setItem("last-scroll", listRef.current.scrollTop);
					}}
					to={{ pathname: `/words/${wordData.word}`, state: { wordData, id } }}
				>
					{wordData.word}
				</RouterLink>

				{location.pathname !== "/new-words" &&
					location.pathname !== "/properly-pronunciation-words" && (
						<span className="ml-2 capitalize">
							Category: <span className="text-red-500">{wordData.category}</span>
						</span>
					)}
			</header>
		</Fade>
	);
}

export default WordCardHeader;
