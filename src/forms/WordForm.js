import { useEffect, useState } from "react";

// UI
import { Button, IconButton } from "@material-ui/core";
import Controls from "../common-components/controls/Controls";
import SpeechToText from "../common-components/controls/SpeechToText";

// Icons

// Hooks
import { useForm, Form } from "../hooks/useForm";

// Util

// Info
import { WORD_CATEGORIES } from "../helpers/info";

// Components
import Store from "../back-ends/Store";
import FormList from "../common-components/ui/form-list/FormList";

export default function WordForm(props) {
	const { wordData, handleClosePopup, action, wordDocId } = props;

	const { sentences, synonyms, category } = wordData;

	// State vars
	const [wordText, setWord] = useState(wordData.word);
	const [sens, setSens] = useState(sentences);
	const [syns, setSyns] = useState(synonyms);
	const [needMoreInfo, setNeedMoreInfo] = useState(true);
	const [wordAvailability, setWordAvailability] = useState("");

	// Import useForm
	const formInitialValues = { category };
	const { values: wordInfo, inputCommonProps } = useForm(
		formInitialValues,
		false
	);

	// Speech to text hook
	const {
		listeningIcon,
		handleStartStopListening,
		text: result,
	} = SpeechToText();

	// add a listener for speech to text hooks
	useEffect(() => {
		// don't change it at the first render
		if (result !== "") setWord(result);
	}, [result]);

	// blank the wordAvailability if the word changes
	useEffect(() => {
		setWordAvailability("");
	}, [wordText]);

	// Sentences form list props
	const sensFormListProps = {
		listLabel: "Sentences",
		list: sens,
		inputLabel: "Sentence Here...",
		setList: setSens,
		wrapperClassName: "mt-4",
	};

	// Synonyms form list props
	const synonymsFormListProps = {
		listLabel: "Synonyms",
		list: syns,
		inputLabel: "Synonym Here...",
		setList: setSyns,
		wrapperClassName: "mt-2",
	};

	// Import the Store component to add the word to the db
	const { handleUpdateWord, handleAddWord, wordDicAbility } = Store();

	// handle add the word
	const handleSubmit = () => {
		const DBWord = {
			category: wordInfo.category.toLowerCase(),
			word: wordText.toLowerCase(),
			sentences: sens.filter((sentence) => sentence.body !== ""),
			synonyms: syns.filter((synonym) => synonym.body !== ""),
		};

		// Close the popup
		handleClosePopup();

		// Send it to database
		if (wordText === "") return;

		if (action === "update") {
			handleUpdateWord(wordDocId, DBWord);
		} else {
			handleAddWord(DBWord, needMoreInfo);
		}
	};

	// handle check word availability
	const handleCheckWord = async () => {
		const msg = `${!(await wordDicAbility(wordText)) ? "Not" : ""} Available`;
		setWordAvailability(msg);
	};

	// Word availability style
	const availabilityMsgStyle =
		wordAvailability == "Available" ? "green" : "red";

	return (
		<Form onSubmit={handleSubmit}>
			{/* Word input */}
			<div className="mb-3 flex items-center space-x-2">
				<Controls.TextInput
					InputProps={{ autoFocus: true, autoComplete: "off" }}
					label="Word"
					inputChange={(e) => setWord(e.target.value)}
					value={wordText}
				/>

				<IconButton
					color="primary"
					size="small"
					onClick={handleStartStopListening}
				>
					{listeningIcon}
				</IconButton>
			</div>

			{/* category input */}
			<Controls.SelectBoxInput
				items={WORD_CATEGORIES}
				{...inputCommonProps("Category", "category", wordInfo.category)}
			/>

			{/* Sentences forms list */}
			<div className="my-3">
				<FormList {...sensFormListProps} />
			</div>

			{/* <Divider orientation="horizontal" /> Just to remember it */}

			{/* Sentences forms list */}
			<div className="mt-6">
				<FormList {...synonymsFormListProps} />
			</div>

			{/* action => Submit(add, update) button & check word availability in the dictionary */}
			<div className="mt-5 flex justify-between flex-wrap">
				<div className="flex space-x-2 ">
					<Button type="submit" color="secondary" variant="outlined">
						<span className="capitalize">{action}</span>
					</Button>

					<div className="flex items-center">
						<Button
							onClick={handleCheckWord}
							type="button"
							color="primary"
							variant="outlined"
						>
							<span className="capitalize">Dic. Check</span>
						</Button>

						<p className={`ml-2 text-sm text-${availabilityMsgStyle}-600`}>
							{wordAvailability}
						</p>
					</div>
				</div>
				{/* a switch for (more info) need */}
				<div>
					<Controls.Toggler
						checked={needMoreInfo}
						label="Dic. info"
						inputChange={(e) => setNeedMoreInfo(e.target.checked)}
						color="secondary"
					/>
				</div>
			</div>
		</Form>
	);
}
