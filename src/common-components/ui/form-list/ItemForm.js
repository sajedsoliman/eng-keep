// UI
import { IconButton } from "@material-ui/core";
import Controls from "../../controls/Controls";

// Icons
import { TrashIcon } from "@heroicons/react/outline";

// Hooks
import { Form } from "../../../hooks/useForm";
import { useEffect, useRef } from "react";

function ItemForm({ handleUpdate, handleDelete, label, value, lastNewAddedFormId }) {
	const formInputRef = useRef();

	useEffect(() => {
		if (lastNewAddedFormId === value.id) {
			formInputRef.current.querySelector("input").focus();
		}
	}, [lastNewAddedFormId]);

	return (
		<Form className="flex items-center space-x-3">
			<Controls.TextInput
				inputRef={formInputRef}
				inputChange={(e) => handleUpdate(value.id, e.target.value)}
				value={value.body || value.text}
				label={label}
			/>

			{/* button for focus state */}
			<IconButton onClick={() => handleDelete(value.id)} size="small">
				<TrashIcon className="h-6 cursor-pointer text-red-600 " />
			</IconButton>
		</Form>
	);
}

export default ItemForm;
