import React from "react";

// Material components
import { Switch, FormControlLabel } from "@material-ui/core";

interface Props {
	checked: boolean;
	inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	name?: string;
	placement?: "end" | "start" | "top" | "bottom";
	color?: "primary" | "secondary";
}

function Toggler({
	inputChange,
	checked,
	name,
	label,
	color = "primary",
	placement = "end",
}: Props) {
	return (
		<FormControlLabel
			value={checked}
			control={<Switch checked={checked} onChange={inputChange} name={name} color={color} />}
			label={label}
			labelPlacement={placement}
		/>
	);
}

export default Toggler;
