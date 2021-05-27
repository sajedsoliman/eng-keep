import { useEffect, useRef, useState } from "react";

// UI
import { Button, IconButton } from "@material-ui/core";
import Controls from "../../controls/Controls";

// Icons
import { TrashIcon } from "@heroicons/react/outline";

// Hooks
import { Form } from "../../../hooks/useForm";

// Components
import SpeechToText from "../../controls/SpeechToText";

function ItemForm({ handleUpdate, handleDelete, label, value, lastNewAddedFormId }) {
	const formInputRef = useRef();

	// State vars
	const [inputValue, setInputValue] = useState(value.body);

	// Import SpeechToText component to add add the ability to say the items
	const { handleStartStopListening, text: result, listeningIcon } = SpeechToText();

	useEffect(() => {
		// Add a condition not to set inputValue on load
		if (result != "") {
			handleUpdate(value.id, result);
			setInputValue(result);
		}
	}, [result]);

	// Set a listener to track the last added form and autofocus it when it gets added
	useEffect(() => {
		// handle focus the last added new form's input
		if (lastNewAddedFormId === value.id) {
			formInputRef.current.querySelector("input").focus();
		}
	}, [lastNewAddedFormId]);

	// Handle delete the form item
	const handleDeleteItem = () => {
		// Stop the mic if is already starting
		handleStartStopListening();

		handleDelete(value.id);
	};

	return (
		<Form className="flex items-center space-x-3">
			<Controls.TextInput
				inputRef={formInputRef}
				inputChange={(e) => {
					handleUpdate(value.id, e.target.value);
					setInputValue(e.target.value);
				}}
				value={inputValue}
				label={label}
			/>

			<div className="flex">
				{/* using the IconButton for focusing state */}
				<IconButton onClick={handleStartStopListening} color="primary" size="small">
					{listeningIcon}
				</IconButton>

				<IconButton onClick={handleDeleteItem} size="small">
					<TrashIcon className="h-6 cursor-pointer text-red-600 " />
				</IconButton>
			</div>
		</Form>
	);
}

export default ItemForm;
