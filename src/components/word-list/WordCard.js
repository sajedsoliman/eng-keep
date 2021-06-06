import { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// UI
import { Fade } from "@material-ui/core";

// Icons

// Util
import IF from "../../common-components/util/IF";

// Components
import Store from "../../back-ends/Store";
import WordControls from "./WordControls";
import WordExamples from "./WordExamples";
import WordSynonyms from "./WordSynonyms";
import WordCardHeader from "./WordCardHeader";

function WordCard({ wordData, id, listRef }) {
	// Destructuring through the word object
	const { word, images, sentences, synonyms, wordAudio } = wordData;

	// Router
	const history = useHistory();
	const location = useLocation();
	if (location.state && location.state.lastWordOpen) {
		history.replace(location.state.lastWordOpen);
	}

	// State vars
	const [wordImage, setWordImage] = useState("");

	// Refs
	const audioRef = useRef();

	// Import the Store component to handle getting the synonym audio src
	const { handleDeleteWord } = Store();

	// Handle delete word
	const handleRemoveWord = () => {
		handleDeleteWord(id);
	};

	// handle show a random image
	const handleShowImage = () => {
		const randImage =
			images.sort(() => Math.random() - 0.5).length === 0
				? ""
				: images.sort(() => Math.random() - 0.5)[0];
		setWordImage((prevState) => (prevState === "" ? randImage : ""));
	};

	// Card styles - classNames
	const cardStyles = {
		backgroundImage: `url('${wordImage}')`,
		minHeight: wordData.category === "phrase" && 272,
		height: wordData.category === "phrase" && 272,
	};
	const cardClassnames = `${
		wordImage !== "" && "text-white"
	} border p-4 bg-white bg-cover rounded-md overflow-hidden relative shadow-inner bg-center bg-no-repeat`;

	return (
		<div className={cardClassnames} style={cardStyles} id={word}>
			{/* overlay */}
			<IF condition={wordImage !== ""}>
				<div
					className="absolute w-full h-full inset-0"
					style={{ background: "rgb(0 0 0 / 60%)" }}
				></div>
			</IF>
			{/* Word Body */}
			<div className="flex flex-col relative h-full">
				{/* Header */}
				<WordCardHeader
					listRef={listRef}
					wordImage={wordImage}
					id={id}
					wordData={wordData}
					audioRef={audioRef}
				/>

				{/* Word Controls */}
				<WordControls
					id={id}
					wordData={wordData}
					handleRemoveWord={handleRemoveWord}
					handleShowImage={handleShowImage}
					wordImage={wordImage}
				/>

				{/* If there is no image hide the content */}
				<Fade in={!Boolean(wordImage)}>
					<div className="mt-auto">
						{/* Sentences */}
						<WordExamples sentences={sentences} word={word} />

						{/* Synonyms */}
						<WordSynonyms synonyms={synonyms} />
					</div>
				</Fade>
			</div>

			{/* word audio sound reference */}
			<audio src={wordAudio} ref={audioRef}></audio>
		</div>
	);
}

export default WordCard;
