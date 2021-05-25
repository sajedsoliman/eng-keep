import { useState } from "react";
// UI
import { Divider, IconButton, makeStyles } from "@material-ui/core";
// Icons
import { PlusCircleIcon } from "@heroicons/react/outline";

// Components
import ItemForm from "./ItemForm";

// Styles
const useStyles = makeStyles((theme) => ({
	titleDivider: {
		flex: 1,
		marginRight: 5,
		marginBottom: 2,
		marginLeft: 2,
	},
}));

function FormList({ list, setList, inputLabel, listLabel, wrapperClassName }) {
	const classes = useStyles();

	// State vars
	// To focus the last added form when we add a new one
	const [newFormId, setNewFormId] = useState("");

	// Handle update a certain sentence
	const handleUpdateItem = (id, newValue) => {
		setList(list.map((item) => (item.id === id ? { body: newValue, id: id } : item)));
	};

	// Handle add a new sentence form
	const handleAddItemForm = () => {
		const id = new Date().getTime();
		setList((prevList) => [...prevList, { body: "", id }]);

		// Handle focus the list item form when add
		setNewFormId(id);
	};

	// Handle delete a sentence
	const handleDeleteItem = (id) => {
		setList(list.filter((item) => item.id !== id));
	};

	// Map through form
	const mappedForms = list.map((itemForm) => {
		return (
			<ItemForm
				key={itemForm.id}
				value={itemForm}
				handleUpdate={handleUpdateItem}
				handleDelete={handleDeleteItem}
				label={inputLabel}
				lastNewAddedFormId={newFormId}
			/>
		);
	});

	return (
		<div className={wrapperClassName}>
			{/* List title (label) */}
			<div className="flex justify-between items-center mb-1">
				{/* Title */}
				<h5 className="mb-1 font-semibold">{listLabel}</h5>

				<Divider orientation="horizontal" variant="fullWidth" className={classes.titleDivider} />

				{/* Add form button - in the end of the title */}
				<IconButton onClick={handleAddItemForm} size="small">
					<PlusCircleIcon className="h-6 text-red-500 cursor-pointer" />
				</IconButton>
			</div>

			{/* Forms */}
			{mappedForms}

			{/* Add form button - in the bottom */}
			{/* <div className="mt-2 text-center">
				<IconButton onClick={handleAddItemForm} size="small">
					<PlusCircleIcon className="h-6 text-red-500 cursor-pointer" />
				</IconButton>
			</div> */}
		</div>
	);
}

export default FormList;
