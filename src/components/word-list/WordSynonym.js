import { useEffect, useState } from "react";

// icons
import { BanIcon, VolumeUpIcon } from "@heroicons/react/outline";

// components
import Store from "../../back-ends/Store";
import Helpers from "../../back-ends/HelperFunctions";

export const WordSynonym = ({ body }) => {
	// State vars
	const [isInDic, setInDic] = useState(true);

	// Store component
	const { handleGetAudioSrc } = Store();

	const { wordDicAbility } = Helpers();

	// get audio availability for the synonym. onMounted
	useEffect(() => {
		async function asyCall() {
			const isWordInDic = await wordDicAbility(body);
			if (isWordInDic) return;

			setInDic(false);
		}

		asyCall();
	}, []);

	// Handle speak synonyms
	const handleSpeakSynonym = async (word) => {
		const audioSrc = await handleGetAudioSrc(word);
		const audioEl = document.createElement("audio");
		audioEl.src = audioSrc;
		audioEl.play();
	};

	return (
		<li className={`flex items-center`}>
			{isInDic ? (
				<VolumeUpIcon
					onClick={() => handleSpeakSynonym(body)}
					className={`h-5 mr-2 cursor-pointer text-red-400`}
				/>
			) : (
				<BanIcon className={`h-5 mr-2 cursor-default text-red-400`} />
			)}
			{body}
		</li>
	);
};
