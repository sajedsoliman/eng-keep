// router
import { Route } from "react-router";

// Hooks
import useAlan from "./hooks/useAlan";

// Components
import EngKeep from "./components/EngKeep";
import SingleWord from "./components/single-word/SingleWord";

function App() {
	useAlan();

	return (
		<>
			<EngKeep />
		</>
	);
}

export default App;
