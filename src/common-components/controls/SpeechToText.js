import { useEffect, useState } from "react";

// Icons
import { MicrophoneIcon, StopIcon } from "@heroicons/react/outline";

// Voice recognition setup
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new speechRecognition();
mic.continuous = true;
mic.interimResults = true;

function SpeechToText() {
	const [isListening, setListening] = useState(false);
	const [text, setText] = useState("");
	const [result, setResult] = useState("");

	const handleListen = () => {
		if (isListening) {
			mic.start();
			mic.onend = () => {
				mic.start();
			};
		} else {
			mic.stop();
			mic.onend = () => {
				setResult(text);
			};
		}

		mic.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join("");
			setText(transcript);
			mic.onerror = (event) => {};
		};
	};

	const handleStartStopListening = () => {
		setListening((prev) => !prev);
	};

	useEffect(() => {
		handleListen();
	}, [isListening]);

	// listening status icons
	const listeningIcon = isListening ? (
		<StopIcon className="h-6 text-red-500" />
	) : (
		<MicrophoneIcon className="h-6" />
	);

	return {
		handleStartStopListening,
		text,
		isListening,
		listeningIcon,
	};
}

export default SpeechToText;
