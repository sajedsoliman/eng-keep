// UI

// Hooks
import { useForm } from "../hooks/useForm";

// Info
import { USER_SIGNIN_INITIAL_VALUES } from "../helpers/info";

// Component
import UserForm from "../forms/UserForm";

function Login() {
	// useForm hook
	const { values: userInfo, inputCommonProps } = useForm(USER_SIGNIN_INITIAL_VALUES, false);

	// handle sign in the user
	const handleSubmit = () => {
		console.log(userInfo);
	};

	return (
		<UserForm
			userInfo={userInfo}
			inputCommonProps={inputCommonProps}
			submitHandler={handleSubmit}
		/>
	);
}

export default Login;
