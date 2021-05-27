import { useEffect, useState } from "react";

// UI
import { Button } from "@material-ui/core";
import Controls from "../common-components/controls/Controls";

// Icons
import { PlusCircleIcon } from "@heroicons/react/outline";

// Hooks
import { Form, useForm } from "../hooks/useForm";

// Info
import { WORD_CATEGORIES } from "../helpers/info";

// Components
import Store from "../back-ends/Store";
import FormList from "../common-components/ui/form-list/FormList";
import IF from "../common-components/util/IF";

function WordForm({ wordData, handleClosePopup, action, wordDocId }) {
	const { sentences, synonyms, category, word } = wordData;

	// State vars
	const [sens, setSens] = useState(sentences);
	const [syns, setSyns] = useState(synonyms);
	const [wordAvailability, setWordAvailability] = useState("");

	console.log(sens);

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
			handleAddWord(word);
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
			<div className="mb-3">
				<Controls.TextInput
					InputProps={{ autoFocus: true, autoComplete: "off" }}
					{...inputCommonProps("Word", "word", wordInfo.word)}
				/>
			</div>

			<Controls.SelectBoxInput
				items={WORD_CATEGORIES}
				{...inputCommonProps("Category", "category", wordInfo.category)}
			/>

			<div className="my-3">
				{/* Sentences form list */}
				<FormList {...sensFormListProps} />
			</div>

			{/* <Divider orientation="horizontal" /> */}

			<div className="mt-6">
				{/* Sentences form list */}
				<FormList {...synonymsFormListProps} />
			</div>

			{/* action => Submit button & check word availability in the dictionary */}
			<div className="mt-5 flex space-x-2">
				<Button type="submit" color="secondary" variant="outlined">
					<span className="capitalize">{action}</span>
				</Button>

				<div className="flex items-center">
					<Button onClick={handleCheckWord} type="button" color="primary" variant="outlined">
						<span className="capitalize">Check Word</span>
					</Button>

					<p className={`ml-2 text-sm text-${availabilityMsgStyle}-600`}>{wordAvailability}</p>
				</div>
			</div>
		</Form>
	);
}

export default WordForm;
