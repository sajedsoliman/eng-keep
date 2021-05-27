import React from "react";

// UI
import { Grid } from "@material-ui/core";

// Components
import WordCard from "./WordCard";

export const WordList = React.memo(
	({ list, lastWordRef }) => {
		// mapping through the given word list
		const mappedWords = list.map((wordDoc, index) => {
			const { id, word } = wordDoc;
			const gridProps = {
				item: true,
				md: 6,
				lg: 4,
				key: id,
			};

			if (list.length - 1 === index) {
				return (
					<Grid ref={lastWordRef} {...gridProps}>
						<WordCard wordData={word} id={id} />
					</Grid>
				);
			}
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
		if (prevProps.list === currProps.list) {
			return true;
		}

		return false;
	}
);
