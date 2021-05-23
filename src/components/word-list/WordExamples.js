// UI
import { Grid } from "@material-ui/core";

// Utilities
import parse from "html-react-parser";

function WordExamples({ sentences, word }) {
	// Map through sentences
	const mappedSentences = sentences
		.sort(() => Math.random() - 0.5)
		.slice(0, 3)
		.map((sentence) => {
			const keywordRegex = new RegExp(`(${word})\\w*`, "gi");
			return (
				sentence !== "" && (
					<li className="mb-2 leading-5 text-sm">
						{parse(sentence.body.replace(keywordRegex, `<span class='underline'>$&</span>`))}
						{sentence.body.includes(".") ? "" : "."}
					</li>
				)
			);
		});

	return (
		<Grid item>
			<h4 className="mt-3 mb-1 font-semibold">Sentences</h4>
			<ul>{mappedSentences}</ul>
		</Grid>
	);
}

export default WordExamples;
