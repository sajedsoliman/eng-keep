// UI

// Icons
import { VolumeUpIcon } from "@heroicons/react/outline";
import { Grid } from "@material-ui/core";

// Components
import Store from "../../back-ends/Store";

function WordSynonyms({ synonyms }) {
	// Store component
	const { handleGetAudioSrc } = Store();

	// Handle speak synonyms
	const handleSpeakSynonym = async (word) => {
		const audioSrc = await handleGetAudioSrc(word);
		const audioEl = document.createElement("audio");
		audioEl.src = audioSrc;
		audioEl.play();
	};

	// new Set to remove the duplicated synonyms
	const bodies = synonyms.map((synonym) => synonym.body);
	const refinedBodies = [...new Set(bodies)];
	const finalSynonyms = refinedBodies.map((body) =>
		synonyms.find((synonym) => synonym.body === body)
	);

	// Map through synonyms
	const mappedSynonyms = finalSynonyms
		.sort(() => Math.random() - 0.5)
		.slice(0, 3)
		.map(({ body, id }) => (
			<li key={id} className="flex items-center">
				<VolumeUpIcon
					onClick={() => handleSpeakSynonym(body)}
					className="h-5 mr-2 cursor-pointer text-red-400"
				/>
				{body}
			</li>
		));

	return (
		<Grid item>
			<h4 className="mt-3 font-semibold mb-1">Synonyms</h4>
			<ul>{mappedSynonyms}</ul>
		</Grid>
	);
}

export default WordSynonyms;
