import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
	name: "global state variables",
	initialState: {
		searchText: "",
	},
	reducers: {
		updateSearch: (state, action) => {
			state.searchText = action.payload;
		},
	},
});

const { actions, reducer } = globalSlice;

export const { updateSearch } = actions;

export default reducer;
