import React from "react";

// material imports
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// icons
import { BadgeCheckIcon } from "@heroicons/react/solid";

export default function SelectBoxInput(props) {
	const { onChange, validationError, value, items, name, label } = props;

	return (
		<TextField
			{...(validationError && { error: true, helperText: validationError })}
			onChange={onChange}
			name={name}
			fullWidth
			variant="outlined"
			label={label}
			select
			margin="dense"
			size="small"
			value={value}
		>
			{items.map((item) => {
				return (
					<MenuItem key={item} value={item} style={{ textTransform: "capitalize" }}>
						{item}
					</MenuItem>
				);
			})}
		</TextField>
	);
}
