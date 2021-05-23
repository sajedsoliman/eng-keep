// router
import { useLocation } from "react-router";

// UI
import { Grid } from "@material-ui/core";

// Components
import WordCard from "../word-list/WordCard";
function SingleWord() {
	// Import router location to get the word object from the state
	const location = useLocation();
	const wordData = location.state.wordData;
	const id = location.state.id;

	// Random image
	const rand_image = wordData.images.sort(() => Math.random() - 0.5)[0];

	return (
		<div className="p-1 border rounded-md">
			<Grid container justify="center">
				<Grid item xs={12} md={7} lg={9}>
					<WordCard id={id} wordData={wordData} />
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					<img src={rand_image} className="w-full rounded-md mt-3" />
				</Grid>
			</Grid>
		</div>
	);
}

export default SingleWord;
