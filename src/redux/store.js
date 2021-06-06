import { configureStore } from "@reduxjs/toolkit";

// Reducers
import globalsReducer from "./reducers/globals";

const store = configureStore({
	reducer: {
		globals: globalsReducer,
	},
});

export default store;
