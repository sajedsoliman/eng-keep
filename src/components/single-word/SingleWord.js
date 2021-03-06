import { useState } from "react";

// router
import { useLocation, useHistory, Redirect } from "react-router-dom";

// UI
import { Grid, IconButton, makeStyles } from "@material-ui/core";

// Util
import IF from "../../common-components/util/IF";

// Components
import { RefreshIcon } from "@heroicons/react/outline";
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
	const wordData = location.state?.wordData;
	const id = location.state?.id;

	// State vars
	const [randomImage, setRandomImage] = useState(wordData?.images[0]);

	// handle change the image (randomize it)
	const handleRandomizeImage = () => {
		const rand_image = wordData.images.sort(() => Math.random() - 0.5)[0];
		setRandomImage(rand_image);
	};

	// a message to display if there is no image available for this word
	const noImgMsg = <h3 className="text-center mt-2">No image for this word</h3>;

	// if word does not exist then redirect to homepage
	if (!wordData) return <Redirect to="/" />;
	return (
		<div className="p-2 border space-x-2">
			<Grid container spacing={2}>
				<Grid item xs={12} md={7}>
					<WordCard id={id} wordData={wordData} />
				</Grid>
				<Grid item xs={12} md={5} className={`${classes.imageGrid}`}>
					<IF condition={Boolean(randomImage)} elseChildren={noImgMsg}>
						<div className="relative rounded-md overflow-hidden mt-2 h-72">
							<div
								style={{ backgroundColor: "rgba(0, 0, 0, .40)" }}
								className="w-full h-full inset-0 absolute z-10 flex items-center justify-center"
							>
								<IconButton onClick={handleRandomizeImage}>
									<RefreshIcon className="h-6 text-white cursor-pointer" />
								</IconButton>
							</div>
							<img src={randomImage} className="w-full h-full absolute object-cover" />
						</div>
					</IF>
				</Grid>
			</Grid>
		</div>
	);
}

export default SingleWord;
