// UI
import { ClickAwayListener, makeStyles, MenuItem, MenuList } from "@material-ui/core";
import CustomMenuList from "../common-components/ui/CustomMenuList";

// Info
import { DATE_SORTING_PERIODS } from "../helpers/info";

// Styles
const useStyles = makeStyles((theme) => ({
	activeItem: {
		borderLeft: "2px solid black",
	},
}));

function PeriodMenu({ open, anchorEl, handleChangePeriod, handleTogglePeriodMenu, currentPeriod }) {
	const classes = useStyles();

	//  handle click on the menu item (period item)
	const handleClickItem = (period) => {
		// Change the curr period
		handleChangePeriod(period);

		// Close the menu
		handleTogglePeriodMenu();
	};

	// Map through date period
	const mappedPeriods = DATE_SORTING_PERIODS.map(({ label, period }) => (
		<MenuItem
			key={label}
			onClick={() => handleClickItem(period)}
			className={currentPeriod === period && classes.activeItem}
		>
			{label}
		</MenuItem>
	));

	return (
		<CustomMenuList open={open} anchorEl={anchorEl} placement={"center"}>
			{/* away listener to close the menu as we click outside of the menu */}
			<ClickAwayListener onClickAway={handleTogglePeriodMenu}>
				<div className="w-44">
					<MenuList autoFocusItem>{mappedPeriods}</MenuList>
				</div>
			</ClickAwayListener>
		</CustomMenuList>
	);
}

export default PeriodMenu;
