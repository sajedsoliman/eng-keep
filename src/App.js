// Hooks
import useAlan from "./hooks/useAlan";

// Contexts
import { AuthedUser } from "./contexts/UserContext";

// Components
import EngKeep from "./components/EngKeep";

function App() {
	const loggedUser = AuthedUser();

	// inject Alan Ai button
	useAlan();

	return <EngKeep />;
}

export default App;
