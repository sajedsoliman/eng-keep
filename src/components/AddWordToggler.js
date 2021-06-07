import { useState } from "react";

// UI
import { Fab, makeStyles } from "@material-ui/core";
import PopUp from "../common-components/ui/PopUp";

// Icons
import { PlusIcon } from "@heroicons/react/outline";

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
	addNewWordBtn: {
		width: 55,
		height: 55,
		marginBottom: 15,
		position: "fixed",
		bottom: 80,
		right: 25,
		"&:focus": {
			outline: "none",
		},
	},
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
			{/* Add word form's toggler - if there is a logged user */}
			<IF condition={isUserLogged}>
				<Fab onClick={handleTogglePopup} color="secondary" className={classes.addNewWordBtn}>
					<PlusIcon className="h-8" />
				</Fab>
			</IF>

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
