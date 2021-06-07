import { useState, useEffect } from "react";

// UI
import { RefreshIcon } from "@heroicons/react/outline";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

// Utilities
import parse from "html-react-parser";

function WordExamples({ sentences, word }) {
	// State vars
	// for sentences so that i can handle refreshing it
	const [sents, setSents] = useState(sentences);

	// handle refresh the sentences list
	const handleRefreshSentences = () => {
		const newSentences = sentences.sort(() => Math.random() - 0.5);

		setSents([...newSentences]);
	};

	// Set a listener for sents update
	useEffect(() => {
		// if sentences get updated then refresh the list
		handleRefreshSentences();
	}, [sentences]);

	// Map through sentences
	let mappedSentences = sents.slice(0, 3).map(({ body, id, userProvided }) => {
		// word.slice(0, word.length - 1) to handle the (e) in most of words like accus(e)ing
		const keywordRegex = new RegExp(`(${word.slice(0, word.length - 1)})\\w*`, "gi");
		const ownSensStyle = "text-red-400";
		return (
			body !== "" && (
				<li key={id} className={`mb-2 leading-5 text-sm  ${userProvided && ownSensStyle}`}>
					{parse(body.replace(keywordRegex, `<span class='underline'>$&</span>`))}
					{body.includes(".") ? "" : "."}
				</li>
			)
		);
	});

	return (
		<Grid item>
			<h4 className="mt-3 mb-1 font-semibold flex items-center space-x-1">
				<span>Sentences</span>
				<Tooltip title={"Refresh Sentences"} placement="right" arrow={true}>
					<IconButton size="small" onClick={handleRefreshSentences}>
						<RefreshIcon className={"h-4 text-red-500 cursor-pointer"} />
					</IconButton>
				</Tooltip>
			</h4>
			<ul>{mappedSentences}</ul>
		</Grid>
	);
}

export default WordExamples;
