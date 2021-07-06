import { useState } from "react";

// UI
import { Fab, makeStyles } from "@material-ui/core";
import PopUp from "../common-components/ui/PopUp";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

// Icons
import { Add } from "@material-ui/icons";

// Info
import { wordDataInitialValues } from "../helpers/info";

// Util
import IF from "../common-components/util/IF";

// Contexts
import { AuthedUser } from "../contexts/UserContext";

// Components
import WordForm from "../forms/WordForm";

// Styles
const useStyles = makeStyles((theme) => ({
	addNewWordBtn: {},
}));

function AddWordToggler() {
	const classes = useStyles();
	const loggedUser = AuthedUser();

	// State vars
	const [addWordFormPopupOpen, setPopupOpen] = useState(false);

	// handle toggle add word form popup
	const handleTogglePopup = () => {
		setPopupOpen((prev) => !prev);
	};

	// popup props
	const PopUpProps = {
		infoFunc: {
			title: "Add a new word",
			isOpen: addWordFormPopupOpen,
		},
		closeHandle: handleTogglePopup,
		maxWidth: "sm",
		dividers: true,
	};

	// user is logged condition
	const isUserLogged = loggedUser !== "no user";

	return (
		<>
			{/* Add word form's toggler */}
			<SpeedDialAction
				icon={<Add />}
				tooltipTitle="Add Word"
				FabProps={{ color: "secondary" }}
				onClick={handleTogglePopup}
			/>

			{/* Add word popup */}
			<PopUp {...PopUpProps}>
				<WordForm
					action="add"
					wordData={wordDataInitialValues}
					handleClosePopup={handleTogglePopup}
				/>
			</PopUp>
		</>
	);
}

export default AddWordToggler;
