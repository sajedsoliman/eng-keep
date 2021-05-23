// UI
import { Grid } from "@material-ui/core";

// Components
import WordCard from "./WordCard";

function WordList({ list }) {
	// mapping through the given word list
	const mappedWords = list.map((wordDoc) => {
		const { id, word } = wordDoc;
		return (
			<Grid item xs={12} md={6} lg={4}>
				<WordCard key={id} wordData={word} id={id} />
			</Grid>
		);
	});

	return (
		<Grid container spacing={2}>
			{mappedWords}
		</Grid>
	);
}

export default WordList;
