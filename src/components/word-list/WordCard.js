import { useState, useRef } from "react";

// UI
import { Grid } from "@material-ui/core";

// Icons

// Utilities
import IF from "../../common-components/util/IF";

// Components
import Store from "../../back-ends/Store";
import WordControls from "./WordControls";
import WordExamples from "./WordExamples";
import WordSynonyms from "./WordSynonyms";
import WordCardHeader from "./WordCardHeader";

function WordCard({ wordData, id }) {
	// Destructuring through the word object
	const { word, images, sentences, synonyms, wordAudio, category } = wordData;

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
		const randImage = images.sort(() => Math.random() - 0.5)[0];
		setWordImage(randImage);
	};

	return (
		<div
			className={`border p-4 bg-white text-${
				wordImage === "" ? "black" : "white"
			} bg-cover rounded-md overflow-hidden relative shadow-inner bg-center bg-no-repeat`}
			style={{ backgroundImage: `url('${wordImage}')` }}
		>
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
				/>

				<div>
					{/* Sentences */}
					<WordExamples sentences={sentences} word={word} />

					{/* Synonyms */}
					<WordSynonyms synonyms={synonyms} />
				</div>
			</div>

			{/* word audio sound reference */}
			<audio src={wordAudio} ref={audioRef}></audio>
		</div>
	);
}

export default WordCard;
