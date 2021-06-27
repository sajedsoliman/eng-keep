// UI
import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import Controls from "../common-components/controls/Controls";

// Hooks
import { Form } from "../hooks/useForm";

// Util
import IF from "../common-components/util/IF";

// Styles
const useStyles = makeStyles((theme) => ({
	loadingProgress: {},
}));

// Action => signin or register
function UserForm({
	action = "signin",
	submitHandler,
	userInfo,
	inputCommonProps,
	handleAddAvatar,
	validationErrors,
	actionLoading,
}) {
	const classes = useStyles();
	const isRegister = action === "register";

	// Avatar uploader input props
	const avatarUploaderProps = {
		onAddFile: (error, file) => handleAddAvatar(file.file),
		label: "Avatar",
		size: "small",
	};

	return (
		<Form onSubmit={submitHandler}>
			{/* Full Name & avatar - just for register */}
			<IF condition={isRegister}>
				<Grid container spacing={2} alignItems="center">
					<Grid item className="flex-1">
						<Controls.TextInput
							{...inputCommonProps(
								"Full Name",
								"fullName",
								userInfo.fullName,
								validationErrors.fullName
							)}
						/>
					</Grid>
					<Grid item>
						<Controls.FilePondCircular {...avatarUploaderProps} />
					</Grid>
				</Grid>
			</IF>

			{/* Email */}
			<Controls.TextInput
				{...inputCommonProps("Email", "email", userInfo.email, validationErrors.email)}
			/>

			{/* Password  */}
			<Controls.PasswordInput
				{...inputCommonProps("Password", "password", userInfo.password, validationErrors.password)}
			/>

			{/* Avatar */}

			<div className="mt-5 flex items-center space-x-4">
				<Button disabled={actionLoading} variant="outlined" type="submit">
					<IF condition={isRegister} elseChildren={"Login"}>
						Register
					</IF>
				</Button>

				<IF condition={actionLoading}>
					<CircularProgress size={30} className={classes.loadingProgress} color="secondary" />
				</IF>
			</div>
		</Form>
	);
}

export default UserForm;
