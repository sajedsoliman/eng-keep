import React from "react";

// UI
import { Grid } from "@material-ui/core";

// icons
import { EmojiSadIcon } from "@heroicons/react/outline";

// util
import IF from "../../common-components/util/IF";

// Contexts
import { AuthedUser } from "../../contexts/UserContext";

// Components
import WordCard from "./WordCard";

export const WordList = React.memo(
	({ list, listRef, limit, period }) => {
		const loggedUser = AuthedUser();

		// mapping through the given word list
		const mappedWords = list.map((wordDoc) => {
			const { id, word } = wordDoc;
			const gridProps = {
				item: true,
				xs: 12,
				md: 6,
				lg: 4,
				key: id.toString(),
			};

			return (
				<Grid {...gridProps}>
					<WordCard period={period} limit={limit} listRef={listRef} wordData={word} id={id} />
				</Grid>
			);
		});

		// No available words to show message
		const noWordsMsg = (
			<div className="flex w-full items-center justify-center mt-3 space-x-2">
				<EmojiSadIcon className="h-5 text-red-600" />
				<h3 className="text-lg">No Words</h3>
				<EmojiSadIcon className="h-5 text-red-600" />
			</div>
		);

		// user is logged condition
		const isUserLogged = loggedUser !== "no user";

		return (
			<Grid container spacing={2}>
				<IF condition={list.length > 0}>{mappedWords}</IF>
				<IF condition={isUserLogged && list.length === 0}>{noWordsMsg}</IF>
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
