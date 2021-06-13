import React from "react";

// date imports
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export default function DatePicker(props) {
	const { label, name, value, changeDateHandler, open } = props;

	// handle date return value (does not return an e(event) to get the name)
	const handleDateQuirk = (value, name) => {
		return {
			target: { name, value },
		};
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				fullWidth
				variant="inline"
				format="MM/dd/yyyy"
				margin="normal"
				label={label}
				inputVariant="outlined"
				value={value}
				size="small"
				onChange={(date) => changeDateHandler(handleDateQuirk(date, name))}
			/>
		</MuiPickersUtilsProvider>
	);
}
