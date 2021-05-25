// UI
import { ClickAwayListener, MenuItem, MenuList } from "@material-ui/core";
import CustomMenuList from "../common-components/ui/CustomMenuList";

// Info
import { DATE_SORTING_PERIODS } from "../helpers/info";

function PeriodMenu({ open, anchorEl, handleChangePeriod, handleTogglePeriodMenu }) {
	const mappedPeriods = DATE_SORTING_PERIODS.map(({ label, period }) => (
		<MenuItem
			key={label}
			onClick={() => {
				handleChangePeriod(period);
				handleTogglePeriodMenu();
			}}
		>
			{label}
		</MenuItem>
	));

	return (
		<CustomMenuList open={open} anchorEl={anchorEl} placement={"center"}>
			<ClickAwayListener onClickAway={handleTogglePeriodMenu}>
				<div className="w-44">
					<MenuList autoFocusItem>{mappedPeriods}</MenuList>
				</div>
			</ClickAwayListener>
		</CustomMenuList>
	);
}

export default PeriodMenu;
