// material-ui imports
import { TextField, InputAdornment, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SearchIcon } from "@heroicons/react/outline";

// styles
const useStyles = makeStyles((theme) => ({
	searchInput: {
		/* "& .MuiInputBase-root.Mui-focused": {
			"& input": {
				width: 230,
			},
		}, */

		"& .MuiOutlinedInput-inputMarginDense": {
			// width: 200,
			paddingTop: "7.5px",
			paddingBottom: "7.5px",
			// transition: theme.transitions.create("width", { duration: 250 }),
		},
	},
}));

export default function SearchBox(props) {
	// get the input ref to make it as an anchor for popups(search results popup)
	const { value, handleChange, inputRef, className, ...others } = props;
	const classes = useStyles();

	// component prop objects
	const inputProps = {
		onChange: handleChange,
		value,
		ref: inputRef,
		className: `${classes.searchInput} ${className}`,
		variant: "outlined",
		size: "small",
		InputProps: {
			startAdornment: (
				<InputAdornment position="start">
					<SearchIcon className="h-4" />
				</InputAdornment>
			),
		},
		label: "Search",
	};

	return <TextField {...inputProps} {...others} />;
}
