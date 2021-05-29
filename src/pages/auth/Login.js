// UI

// Hooks
import { useForm } from "../../hooks/useForm";

// Info - functions
import { USER_SIGNIN_INITIAL_VALUES } from "../../helpers/info";
import { userValidation } from "../../helpers/functions";

// Component
import UserForm from "../../forms/UserForm";
import Store from "../../back-ends/Store";

function Login() {
	// useForm hook
	const {
		values: userInfo,
		inputCommonProps,
		validationErrors,
		setErrors,
	} = useForm(USER_SIGNIN_INITIAL_VALUES, false, userValidation);

	// Import Store component to handle registering the user
	const { handleSignin, loading } = Store();

	// handle sign in the user  ss
	const handleSubmit = () => {
		// Signin the user if there is no error
		if (userValidation(userInfo, setErrors)) {
			handleSignin(userInfo.email, userInfo.password);
		}
	};

	return (
		<div className="max-w-lg mx-auto">
			<UserForm
				userInfo={userInfo}
				inputCommonProps={inputCommonProps}
				submitHandler={handleSubmit}
				validationErrors={validationErrors}
				actionLoading={loading}
				action="signin"
			/>
		</div>
	);
}

export default Login;
