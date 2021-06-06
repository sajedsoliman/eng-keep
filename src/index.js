import React from "react";
import ReactDOM from "react-dom";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Components
import App from "./App";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Contexts
import { AuthedUserProvider } from "./contexts/UserContext";

// styles
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./styles/theme";
import "./styles/style.css";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Router>
				<Provider store={store}>
					<AuthedUserProvider>
						<CssBaseline />
						<App />
					</AuthedUserProvider>
				</Provider>
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
