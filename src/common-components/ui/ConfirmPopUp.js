import React from "react";

// Material-ui imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

// jss stylings
const useStyles = makeStyles((theme) => ({
	deleteDialog: {
		textAlign: "center",
	},
	dialogTitle: {
		padding: "6px 16px",
	},
	dialogContent: {
		minWidth: 300,
	},
}));

export default function ConfirmPopUp({ onClose, dialogFunc }) {
	// jss stylings hook
	const classes = useStyles();

	// destructuring dialog Function
	const { title, subTitle, isOpen, onConfirm } = dialogFunc;

	return (
		<Dialog className={classes.deleteDialog} open={isOpen} onClose={onClose}>
			<DialogTitle className={classes.dialogTitle} disableTypography>
				<QuestionMarkCircleIcon className={"h-14 mb-2 text-red-600 m-auto"} />
				<Typography gutterBottom={false}>{title}</Typography>
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText>{subTitle}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="default" onClick={onClose}>
					No
				</Button>
				<Button variant="contained" color="secondary" onClick={onConfirm}>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}
