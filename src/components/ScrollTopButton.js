import { useEffect, useState } from "react";

// UI
import { Fab, makeStyles, Slide } from "@material-ui/core";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

// icons
import { ArrowUpward } from "@material-ui/icons";

// hooks

// styles
const useStyles = makeStyles({
	scrollTopBtn: {
		/* 		position: "fixed",
		bottom: 5,
		left: 5,
 */
	},
});

const ScrollTop = ({ wordListRef }) => {
	const classes = useStyles();

	// State vars
	const [scrollTop, setScrollTop] = useState(false);

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

	return (
		<Slide in={scrollTop} direction="left">
			<SpeedDialAction
				key="action-2"
				open={true}
				icon={<ArrowUpward />}
				tooltipTitle="Add Word"
				FabProps={{ color: "primary" }}
				onClick={handleScrollWayTop}
			/>
		</Slide>
	);
};

export default ScrollTop;
