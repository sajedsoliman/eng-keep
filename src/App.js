// Hooks
import useAlan from "./hooks/useAlan";

// Contexts
import { AuthedUser } from "./contexts/UserContext";

// Components
import EngKeep from "./components/EngKeep";
import { Route, Switch } from "react-router";
import SingleWord from "./components/single-word/SingleWord";

function App() {
	const loggedUser = AuthedUser();

	// inject Alan Ai button
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
