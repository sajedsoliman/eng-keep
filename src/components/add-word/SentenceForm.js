// UI
import { IconButton } from "@material-ui/core";
import Controls from "../../common-components/controls/Controls";

// Icons
import { TrashIcon } from "@heroicons/react/outline";

// Hooks
import { Form } from "../../hooks/useForm";

function SentenceForm({ info, index }) {
	const { value, handleUpdate, handleDelete } = info;

	return (
		<Form className="flex items-center space-x-3">
			<Controls.TextInput
				inputChange={(e) => handleUpdate(value.order, e.target.value)}
				value={value.body}
				label="Sentence Here..."
			/>

			{/* button for focus state */}
			<IconButton onClick={() => handleDelete(value.order)} size="small">
				<TrashIcon className="h-6 cursor-pointer text-red-600 " />
			</IconButton>
		</Form>
	);
}

export default SentenceForm;
