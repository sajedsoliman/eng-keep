import { useState, useRef } from "react";

// Router
import { Link as RouterLink } from "react-router-dom";

// Material-UI imports
import { makeStyles, Tabs, Tab } from "@material-ui/core";

// Hooks
import useWindowWidth from "../hooks/useWindowWidth";

// Info
import { PATHS, homepageTabs } from "../helpers/info";

// Components
import PeriodMenu from "./PeriodMenu";

// styles
const useStyles = makeStyles((theme) => ({
	tabsRoot: {
		background: "white",
	},
}));

function HomepageTabs({
	currentTab,
	handleChangeTab,
	isWrapped,
	indClr = "black",
	handleChangePeriod,
	period,
}) {
	const classes = useStyles();

	// refs
	const sortByDateTabRef = useRef();

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
	const mappedTabs = homepageTabs.map((tab) => (
		<Tab
			key={tab.label}
			label={tab.label}
			to={tab.path}
			component={RouterLink}
			{...(tab.path === PATHS.BY_DATE && {
				ref: sortByDateTabRef,
				onClick: handleTogglePeriodMenu,
			})}
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
				value={currentTab}
				centered
			>
				{mappedTabs}
			</Tabs>

			{/* Period menu dropdown */}
			<PeriodMenu
				open={periodMenuOpen}
				anchorEl={sortByDateTabRef.current}
				currentPeriod={period}
				handleChangePeriod={handleChangePeriod}
				handleTogglePeriodMenu={handleTogglePeriodMenu}
			/>
		</>
	);
}

export default HomepageTabs;
