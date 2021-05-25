import { useEffect, useRef } from "react";
import { MenuList, makeStyles, ClickAwayListener, Paper, Grow, Popper } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
	popper: {
		// top: "19px !important",
	},
}));

export default function MenuListCom(props) {
	// destructuring props
	const { anchorEl, handleClose, open, placement = "top-end", popperClassName, children } = props;
	const classes = useStyles();

	const popperProps = {
		open: open != undefined ? open : Boolean(anchorEl),
		anchorEl: anchorEl,
		transition: true,
		className: `${classes.popper} ${popperClassName}`,
		placement,
	};

	return (
		<Popper {...popperProps}>
			<Grow in={open || Boolean(anchorEl)}>
				<Paper elevation={3}>{children}</Paper>
			</Grow>
		</Popper>
	);
}
