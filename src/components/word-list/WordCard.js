import { useState, useRef } from "react";

// UI
import { Fade, Grow } from "@material-ui/core";

// Icons

// Util
import IF from "../../common-components/util/IF";

// Components
import Store from "../../back-ends/Store";
import WordControls from "./WordControls";
import WordExamples from "./WordExamples";
import WordSynonyms from "./WordSynonyms";
import WordCardHeader from "./WordCardHeader";

function WordCard({ wordData, id }) {
	// Destructuring through the word object
	const { word, images, sentences, synonyms, wordAudio } = wordData;

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
		const rendImage = images.sort(() => Math.random() - 0.5)[0];
		setWordImage((prevState) => (prevState == "" ? rendImage : ""));
	};

	// Card styles - classNames
	const cardStyles = {
		backgroundImage: `url('${wordImage}')`,
	};
	const cardClassnames = `${
		wordImage != "" && "text-white"
	} border p-4 bg-white bg-cover rounded-md overflow-hidden relative shadow-inner bg-center bg-no-repeat`;

	return (
		<Grow in={true}>
			<div className={cardClassnames} style={cardStyles}>
				{/* overlay */}
				<IF condition={wordImage !== ""}>
					<div
						className="absolute w-full h-full inset-0"
						style={{ background: "rgb(0 0 0 / 60%)" }}
					></div>
				</IF>
				{/* Word Body */}
				<div className="relative">
					{/* Header */}
					<WordCardHeader wordImage={wordImage} id={id} wordData={wordData} audioRef={audioRef} />

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
						<div>
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
		</Grow>
	);
}

export default WordCard;
