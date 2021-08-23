import { useEffect, useState } from "react";

// UI
import { Grid, IconButton, Tooltip } from "@material-ui/core";

// Icons
import { RefreshIcon } from "@heroicons/react/outline";

// Info & functions
import { removeDuplicatedObjsInArr } from "../../helpers/functions";

// Components
import { WordSynonym } from "./WordSynonym";

function WordSynonyms({ synonyms }) {
	// State vars
	// for synonyms so that i can handle refreshing it
	const [syns, setSyns] = useState(synonyms);

	// handle refresh the synonyms list
	const handleRefreshSynonyms = () => {
		const newSyns = synonyms.sort(() => Math.random() - 0.5);

		setSyns([...newSyns]);
	};

	// Set a listener for sents update
	useEffect(() => {
		// if synonyms get updated then refresh the list
		handleRefreshSynonyms();
	}, [synonyms]);

	// Map through synonyms
	const mappedSynonyms = removeDuplicatedObjsInArr(syns, "body")
		.slice(0, 3)
		.map(({ body, id }) => {
			return <WordSynonym key={id} body={body} />;
		});

	return (
		<Grid item>
			<h4 className="mt-3 font-semibold mb-1 flex items-center space-x-1">
				<span>Synonyms</span>
				<Tooltip title={"Refresh Synonyms"} placement="right" arrow={true}>
					<IconButton size="small" onClick={handleRefreshSynonyms}>
						<RefreshIcon className={"h-4 text-red-500 cursor-pointer"} />
					</IconButton>
				</Tooltip>
			</h4>
			<ul className="flex flex-col space-y-0.5">{mappedSynonyms}</ul>
		</Grid>
	);
}

export default WordSynonyms;
