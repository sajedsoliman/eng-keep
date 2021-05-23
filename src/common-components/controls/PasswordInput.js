import React, { useState } from "react";

// material-ui imports
import { Fade, InputAdornment, TextField } from "@material-ui/core";

// icons
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

export default function PasswordInput({
	validationError,
	inputChange,
	value,
	label,
	name,
	...otherProps
}) {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<TextField
			{...(validationError && { error: true, helperText: validationError })}
			variant="outlined"
			size="small"
			margin="dense"
			value={value}
			onChange={inputChange}
			name={name}
			label={label}
			type={showPassword ? "text" : "password"}
			InputProps={
				value !== "" && {
					endAdornment: (
						<Fade in={true}>
							<InputAdornment position="end">
								{showPassword ? (
									<EyeIcon
										className="h-6"
										style={{ cursor: "pointer" }}
										onClick={handlePasswordVisibility}
									/>
								) : (
									<EyeOffIcon
										className="h-6"
										style={{ cursor: "pointer" }}
										onClick={handlePasswordVisibility}
									/>
								)}
							</InputAdornment>
						</Fade>
					),
				}
			}
			fullWidth
			{...otherProps}
		/>
	);
}
