// router
import { useLocation } from "react-router";

// UI
import { Grid, makeStyles } from "@material-ui/core";

// Util
import IF from "../../common-components/util/IF";

// Components
import WordCard from "../word-list/WordCard";

// Style
const useStyles = makeStyles((theme) => ({
	imageGrid: {
		padding: 0,
	},
}));

function SingleWord() {
	const classes = useStyles();

	// Import router location to get the word object from the state
	const location = useLocation();
	const wordData = location.state.wordData;
	const id = location.state.id;

	// Random image
	const rand_image = wordData.images.sort(() => Math.random() - 0.5)[0];

	// a message to display if there is no image available for this word
	const noImgMsg = <h3 className="text-center">No image for this word</h3>;

	return (
		<div className="p-2 border space-x-2">
			<Grid container>
				<Grid item xs={12} md={7}>
					<WordCard id={id} wordData={wordData} />
				</Grid>
				<Grid item xs={12} md={5} className={`${classes.imageGrid}`}>
					<IF condition={Boolean(rand_image)} elseChildren={noImgMsg}>
						<img src={rand_image} className="w-full mt-3 lg:mt-0" />
					</IF>
				</Grid>
			</Grid>
		</div>
	);
}

export default SingleWord;
