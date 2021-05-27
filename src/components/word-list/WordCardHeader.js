import { Link as RouterLink, useLocation } from "react-router-dom";

// UI
import { Fade } from "@material-ui/core";

// Icons
import { VolumeUpIcon } from "@heroicons/react/outline";

function WordCardHeader({ wordData, id, audioRef, wordImage }) {
	// Import router location to add the word's category if as denoted in the condition below
	const location = useLocation();

	return (
		<Fade in={!Boolean(wordImage)}>
			<header className="flex items-center">
				<VolumeUpIcon
					onClick={() => audioRef.current.play()}
					className="h-5 mr-2 text-red-400 cursor-pointer"
				/>
				<RouterLink
					className={`flex-1 bg-gray-100 rounded-md capitalize pl-1`}
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
