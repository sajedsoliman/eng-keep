import { useEffect, useState } from "react";

// UI
import { Button } from "@material-ui/core";
import Controls from "../common-components/controls/Controls";
import FormList from "../common-components/ui/form-list/FormList";

// Icons

// Hooks
import { Form, useForm } from "../hooks/useForm";

// Util
import IF from "../common-components/util/IF";

// Info
import { WORD_CATEGORIES } from "../helpers/info";

// Components
import Store from "../back-ends/Store";

function WordForm({ wordData, handleClosePopup, action, wordDocId }: any) {
	const { sentences, synonyms, category, word } = wordData;

	// State vars
	const [sens, setSens] = useState(sentences);
	const [syns, setSyns] = useState(synonyms);
	const [needMoreInfo, setNeedMoreInfo] = useState(true);
	const [wordAvailability, setWordAvailability] = useState("");

	// Import useForm
	const formInitialValues = { word, category };
	const { values: wordInfo, inputCommonProps } = useForm(formInitialValues, false);

	// blank the wordAvailability if the word changes
	useEffect(() => {
		setWordAvailability("");
	}, [wordInfo.word]);

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
		const word = {
			category: wordInfo.category.toLowerCase(),
			word: wordInfo.word.toLowerCase(),
			sentences: sens,
			synonyms: syns,
		};

		// Close the popup
		handleClosePopup();

		// Send it to database
		if (action === "update") {
			handleUpdateWord(wordDocId, word);
		} else {
			handleAddWord(word, needMoreInfo);
		}
	};

	// handle check word availability
	const handleCheckWord = async () => {
		const msg = `${!(await wordDicAbility(wordInfo.word)) ? "Not" : ""} Available`;
		setWordAvailability(msg);
	};

	// Word availability style
	const availabilityMsgStyle = wordAvailability == "Available" ? "green" : "red";

	return (
		<Form onSubmit={handleSubmit}>
			{/* Word input */}
			<div className="mb-3">
				<Controls.TextInput
					InputProps={{ autoFocus: true, autoComplete: "off" }}
					{...inputCommonProps("Word", "word", wordInfo.word)}
				/>
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
						<Button onClick={handleCheckWord} type="button" color="primary" variant="outlined">
							<span className="capitalize">Dic. Check</span>
						</Button>

						<p className={`ml-2 text-sm text-${availabilityMsgStyle}-600`}>{wordAvailability}</p>
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

export default WordForm;
