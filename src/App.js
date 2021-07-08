// Hooks
import useAlan from "./hooks/useAlan";

// Contexts
import { AuthedUser } from "./contexts/UserContext";

// Components
import EngKeep from "./components/EngKeep";
import { Route, Switch } from "react-router-dom";
import SingleWord from "./components/single-word/SingleWord";

// now i can use this site map in links
export const siteMap = {
	SingleWord: {
		path: "/words/:word",
		description: "The full word page that shows it fullscreen",
	},
	HomePage: {
		path: "/",
		title: "EngKeep",
		description: "contains all words and tabs",
	},
	NewWordsPage: {
		path: "/new-words",
		title: "EngKeep",
		description: "contains all words under the (new words) category",
	},
	ProperlyPronunciationWordsPage: {
		path: "/properly-pronunciation-words",
		title: "EngKeep",
		description: "contains all words under the (to-properly-pronunciation words) category",
	},
	Signin: {
		path: "/signin",
		title: "EngKeep",
		description: "Login page",
	},
	Register: {
		path: "/register",
		title: "EngKeep",
		description: "register page",
	},
};

function App() {
	const loggedUser = AuthedUser();

	// inject useAlan
	useAlan();

	return (
		<Switch>
			<Route path="/words/:word">
				<SingleWord />
			</Route>

			<EngKeep />
		</Switch>
	);
}

export default App;
