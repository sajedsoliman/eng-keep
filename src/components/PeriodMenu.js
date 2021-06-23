import { useEffect, useState } from "react";
// UI
import { ClickAwayListener, makeStyles, MenuItem, MenuList } from "@material-ui/core";
import CustomMenuList from "../common-components/ui/CustomMenuList";
import "date-fns";
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

	// State vars
	const [customDateOpen, setCustomDateOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

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

	const isCustomDate = typeof currentPeriod === "object" || currentPeriod.label === undefined;

	useEffect(() => {
		if (!isCustomDate) setSelectedDate(new Date());
	}, [currentPeriod]);

	return (
		<CustomMenuList open={open} anchorEl={anchorEl} placement={"center"}>
			{/* away listener to close the menu as we click outside of the menu */}
			<ClickAwayListener onClickAway={handleTogglePeriodMenu}>
				<div className="w-44">
					<MenuList autoFocusItem>
						{mappedPeriods}
						<MenuItem
							className={isCustomDate && classes.activeItem}
							onClick={() => setCustomDateOpen(true)}
						>
							Custom Date
						</MenuItem>
					</MenuList>

					{/* Date Picker */}
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<div className="hidden">
							<DatePicker
								open={customDateOpen}
								value={selectedDate}
								onChange={(date) => {
									handleChangePeriod(date);

									// Change the actual value
									setSelectedDate(date);

									// Close the menu
									handleTogglePeriodMenu();
								}}
								onClose={() => setCustomDateOpen(false)}
							/>
						</div>
					</MuiPickersUtilsProvider>
				</div>
			</ClickAwayListener>
		</CustomMenuList>
	);
}

export default PeriodMenu;
