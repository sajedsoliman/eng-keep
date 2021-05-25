import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SingleWord from "./components/single-word/SingleWord";

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// style
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import "./styles/style.css";
import theme from "./styles/theme";

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
