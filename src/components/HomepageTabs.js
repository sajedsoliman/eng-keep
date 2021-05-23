import { Link as RouterLink } from "react-router-dom";

// Material-UI imports
import { makeStyles, Tabs, Tab } from "@material-ui/core";

// Hooks
import useWindowWidth from "../hooks/useWindowWidth";

// styles
const useStyles = makeStyles((theme) => ({
	indicator: {},
	tabsRoot: {
		background: "white",
	},
}));

function HomepageTabs({ currentTab, tabs, handleChangeTab, isWrapped, indClr = "black" }) {
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
			// {...(isWrapped ? wrapping : {})}
			component={RouterLink}
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
