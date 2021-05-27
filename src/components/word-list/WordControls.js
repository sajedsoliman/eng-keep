import { useState } from "react";

// UI
import { Button } from "@material-ui/core";
import PopUp from "../../common-components/ui/PopUp";

// Icons
import { PencilIcon, PhotographIcon, TrashIcon } from "@heroicons/react/outline";

// Components
import WordForm from "../../forms/WordForm";
import ConfirmPopUp from "../../common-components/ui/ConfirmPopUp";

function WordControls({ handleRemoveWord, handleShowImage, wordData, id, wordImage }) {
	// State vars
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [confirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);

	// handle toggle add word form popup
	const handleTogglePopup = () => {
		setUpdateModalOpen((prev) => !prev);
	};

	// Handle click delete
	const handleConfirmDeleteWordOpen = () => {
		setConfirmDeletePopupOpen((prev) => !prev);
	};

	// Delete dialog function
	const deleteDialogFunc = {
		isOpen: confirmDeletePopupOpen,
		title: "Are you sure ?",
		subTitle: "You can't undo this action",
		onConfirm: handleRemoveWord,
	};

	// update word popup props
	const popupProps = {
		infoFunc: {
			title: `Update the word ${wordData.word}`,
			isOpen: updateModalOpen,
		},
		closeHandle: handleTogglePopup,
		maxWidth: "sm",
		dividers: true,
	};

	return (
		<div className="mt-2 space-x-3 flex">
			{/* Delete Word */}
			<Button
				color="inherit"
				onClick={handleConfirmDeleteWordOpen}
				size="small"
				startIcon={<TrashIcon className="h-5 text-red-500" />}
			>
				Delete
			</Button>

			{/* Show Word's image */}
			<Button
				color="inherit"
				onClick={handleShowImage}
				size="small"
				startIcon={<PhotographIcon className="h-5 text-green-600" />}
			>
				Show {wordImage !== "" ? "Def" : "Image"}
			</Button>

			{/* update Word */}
			<Button
				color="inherit"
				onClick={handleTogglePopup}
				size="small"
				startIcon={<PencilIcon className="h-5 text-blue-700" />}
			>
				Edit
			</Button>

			{/* Update word popup */}
			<PopUp {...popupProps}>
				<WordForm
					wordDocId={id}
					action="update"
					wordData={wordData}
					handleClosePopup={handleTogglePopup}
				/>
			</PopUp>

			{/* Confirm delete popup */}
			<ConfirmPopUp dialogFunc={deleteDialogFunc} onClose={handleConfirmDeleteWordOpen} />
		</div>
	);
}

export default WordControls;
