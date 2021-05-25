import { Link as RouterLink } from "react-router-dom";

// Material-UI imports
import { makeStyles, Tabs, Tab } from "@material-ui/core";

// Hooks
import useWindowWidth from "../hooks/useWindowWidth";
import { PATHS } from "../helpers/info";

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
	tabRef,
	isWrapped,
	indClr = "black",
	handleTogglePeriodMenu,
}) {
	const classes = useStyles();

	// Get the window width to decide the wrapped property if it is enabled
	const { windowWidth } = useWindowWidth();

	const wrapping = windowWidth <= 600 ? { wrapped: true } : {};
	// map through tabs
	const mappedTabs = tabs.map((tab, index) => (
		<Tab
			key={index}
			label={tab.label}
			to={tab.path}
			component={RouterLink}
			{...(tab.path === PATHS.BY_DATE ? { ref: tabRef, onClick: handleTogglePeriodMenu } : {})}
		/>
	));

	// Indicator styles object
	const indicatorStyles = {
		background: indClr,
	};

	return (
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
	);
}

export default HomepageTabs;
