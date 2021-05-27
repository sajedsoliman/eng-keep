import { useState, useRef } from "react";

// Router
import { Link as RouterLink } from "react-router-dom";

// Material-UI imports
import { makeStyles, Tabs, Tab } from "@material-ui/core";

// Hooks
import useWindowWidth from "../hooks/useWindowWidth";

// Info
import { PATHS } from "../helpers/info";

// Components
import PeriodMenu from "./PeriodMenu";

// styles
const useStyles = makeStyles((theme) => ({
	indicator: {},
	tabsRoot: {
		background: "white",
	},
}));

function HomepageTabs({
	currentTab,
	tabs,
	handleChangeTab,
	isWrapped,
	indClr = "black",
	handleChangePeriod,
	period,
}) {
	const classes = useStyles();

	// refs
	const dateTabRef = useRef();

	// State vars
	const [periodMenuOpen, setPeriodMenuOpen] = useState(false);

	// Get the window width to decide the wrapped property if it is enabled
	const { windowWidth } = useWindowWidth();

	// handle toggle the period menu
	const handleTogglePeriodMenu = () => {
		setPeriodMenuOpen((prev) => !prev);
	};

	// const wrapping = windowWidth <= 600 ? { wrapped: true } : {};
	// map through tabs
	const mappedTabs = tabs.map((tab, index) => (
		<Tab
			key={tab.label}
			label={tab.label}
			to={tab.path}
			component={RouterLink}
			{...(tab.path === PATHS.BY_DATE ? { ref: dateTabRef, onClick: handleTogglePeriodMenu } : {})}
		/>
	));

	// Indicator styles object
	const indicatorStyles = {
		background: indClr,
	};

	return (
		<>
			<Tabs
				classes={{ root: classes.tabsRoot }}
				onChange={handleChangeTab}
				TabIndicatorProps={{ style: indicatorStyles }}
				orientation="horizontal"
				value={currentTab}
				// variant={windowWidth <= 600 ? "scrollable" : "fullWidth"}
				scrollButtons={"on"}
				centered
			>
				{mappedTabs}
			</Tabs>

			{/* Period menu dropdown */}
			<PeriodMenu
				open={periodMenuOpen}
				anchorEl={dateTabRef.current}
				currentPeriod={period}
				handleChangePeriod={handleChangePeriod}
				handleTogglePeriodMenu={handleTogglePeriodMenu}
			/>
		</>
	);
}

export default HomepageTabs;
