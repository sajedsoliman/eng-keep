import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./App";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// styles
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./styles/theme";
import "./styles/style.css";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<App />
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
