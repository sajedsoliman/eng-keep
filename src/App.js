// Hooks
import useAlan from "./hooks/useAlan";

// Components
import EngKeep from "./components/EngKeep";

function App() {
	// inject Alan Ai button
	useAlan();

	return <EngKeep />;
}

export default App;
