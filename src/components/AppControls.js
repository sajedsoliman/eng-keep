import { useEffect, useState } from "react";
// UI
import { Fab, makeStyles, Slide } from "@material-ui/core";
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from "@material-ui/lab";
import PopUp from "../common-components/ui/PopUp";

// icons
import { Add, ArrowUpward, Close, Menu } from "@material-ui/icons";

// info
import { wordDataInitialValues } from "../helpers/info";

// hooks
import useAlan from "../hooks/useAlan";

// components
import WordForm from "../forms/WordForm";

const useStyles = makeStyles((theme) => ({
	speedDial: {
		position: "fixed",
		right: 15,
		bottom: 70,
	},
	addWordActionFab: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.common.white,
		"&:hover": {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	scrollTopActionFab: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		"&:hover": {
			backgroundColor: theme.palette.primary.light,
		},
	},
}));

const AppControls = ({ wordListRef }) => {
	const classes = useStyles();

	// State vars
	const [open, setOpen] = useState(false);
	const [scrollTop, setScrollTop] = useState(false);
	const [addWordFormPopupOpen, setPopupOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	// inject useAlan
	const alanInstance = useAlan(".alanBtn_wrapper", open);

	// set a listener for the word list scroll-to-top button
	useEffect(() => {
		wordListRef.current.addEventListener("scroll", (e) => {
			const wordListScrollTop = e.target.scrollTop;
			if (wordListScrollTop > 300) {
				setScrollTop(true);
			} else setScrollTop(false);
		});
	}, [wordListRef.current]);

	// handle scroll top
	const handleScrollWayTop = () => {
		wordListRef.current.scroll({ top: 0, behavior: "smooth" });
	};

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

	return (
		<div className="relative">
			<SpeedDial
				FabProps={{ size: "small" }}
				ariaLabel="App Controls Speed Dial"
				icon={open ? <Close /> : <Menu />}
				className={classes.speedDial}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
			>
				{/* Add word form's toggler */}
				<SpeedDialAction
					icon={<Add />}
					tooltipTitle="Add Word"
					classes={{ fab: classes.addWordActionFab }}
					onClick={handleTogglePopup}
				/>

				<div className="relative" style={{ minWidth: 40, minHeight: 40, margin: 8 }}>
					<div className="alanBtn_wrapper"></div>
				</div>

				{/* Scroll to top button */}
				{scrollTop && (
					<SpeedDialAction
						icon={<ArrowUpward />}
						tooltipTitle="Scroll Top"
						classes={{ fab: classes.scrollTopActionFab }}
						onClick={handleScrollWayTop}
					/>
				)}
			</SpeedDial>

			{/* Add word popup */}
			<PopUp {...PopUpProps}>
				<WordForm
					action="add"
					wordData={wordDataInitialValues}
					handleClosePopup={handleTogglePopup}
				/>
			</PopUp>
		</div>
	);
};

export default AppControls;
