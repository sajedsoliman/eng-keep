import React from "react";

// UI
import { Grid } from "@material-ui/core";

// Components
import WordCard from "./WordCard";

export const WordList = React.memo(
	({ list }) => {
		// mapping through the given word list
		const mappedWords = list.map((wordDoc) => {
			const { id, word } = wordDoc;
			const gridProps = {
				item: true,
				xs: 12,
				md: 6,
				lg: 4,
				key: id,
			};

			return (
				<Grid {...gridProps}>
					<WordCard wordData={word} id={id} />
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{mappedWords}
			</Grid>
		);
	},
	(prevProps, currProps) => {
		// If the list didn't change don't render it again
		if (prevProps.list === currProps.list) {
			return true;
		}

		return false;
	}
);
