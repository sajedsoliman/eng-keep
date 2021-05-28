// UI
import { Button, Grid } from "@material-ui/core";
import Controls from "../common-components/controls/Controls";
import IF from "../common-components/util/IF";

// Hooks
import { Form } from "../hooks/useForm";

// Action => signin or register
function UserForm({ action = "signin", submitHandler, userInfo, inputCommonProps }) {
	const isRegister = action === "register";

	return (
		<Form onSubmit={submitHandler}>
			{/* Full Name & avatar - just for register */}
			<IF condition={isRegister}>
				<Grid container spacing={2}>
					<Grid item xs={7}>
						<Controls.TextInput {...inputCommonProps("Full Name", "fullName", userInfo.fullName)} />
					</Grid>
					<Grid item xs={5} alignItems="center">
						{/* Adding avatar input... */}
						Avatar
					</Grid>
				</Grid>
			</IF>

			{/* Email */}
			<Controls.TextInput {...inputCommonProps("Email", "email", userInfo.email)} />

			{/* Password  */}
			<Controls.PasswordInput {...inputCommonProps("Password", "password", userInfo.password)} />

			{/* Avatar */}

			<div className="mt-5">
				<Button variant="outlined" type="submit">
					<IF condition={isRegister} elseChildren={"Login"}>
						Register
					</IF>
				</Button>
			</div>
		</Form>
	);
}

export default UserForm;
