import { useState } from "react";

// ui
import { Button } from "@material-ui/core";
import Controls from "../common-components/controls/Controls";
// icons
import { SaveOutlined } from "@material-ui/icons";

// components
import { Form } from "../hooks/useForm";

// helpers
import StoreHelpers from "../back-ends/HelperFunctions";

function getDefaultValue() {
	const savedWord = localStorage.getItem("last-word");

	if (savedWord === null) return "";

	return savedWord;
}

function LastRevisedWordFrom({ closePopup }) {
	const [word, setWord] = useState("");

	// Import isWordExisted func from StoreHelpers
	const { isWordExisted } = StoreHelpers();

	const changeWord = (e) => {
		setWord(e.target.value);
	};

	const saveWord = async () => {
		// Check if the word is already existed or not
		if (word === "") return;

		const isExisted = await isWordExisted(word);

		if (isExisted) {
			// save it
			localStorage.setItem("last-word", word.toLowerCase());

			// close popup
			closePopup();
		} else {
			return;
		}
	};

	return (
		<Form onSubmit={saveWord}>
			<Controls.TextInput
				value={word}
				inputChange={changeWord}
				placeholder={`Your last revised word ${
					getDefaultValue() !== "" && ": " + getDefaultValue()
				}`}
				inputProps={{ autoFocus: true }}
			/>

			<div className="mt-3">
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					size="small"
					startIcon={<SaveOutlined />}
				>
					Save
				</Button>
			</div>
		</Form>
	);
}

export default LastRevisedWordFrom;
