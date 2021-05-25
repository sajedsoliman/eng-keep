// UI
import { Grid } from "@material-ui/core";

// Utilities
import parse from "html-react-parser";

function WordExamples({ sentences, word }) {
	// Map through sentences
	const mappedSentences = sentences
		.sort(() => Math.random() - 0.5)
		.slice(0, 3)
		.map(({ body, id, userProvided }) => {
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
			<h4 className="mt-3 mb-1 font-semibold">Sentences</h4>
			<ul>{mappedSentences}</ul>
		</Grid>
	);
}

export default WordExamples;
