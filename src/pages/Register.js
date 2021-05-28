// Hooks
import { useForm } from "../hooks/useForm";

// Info
import { USER_REGISTER_INITIAL_VALUES } from "../helpers/info";

// Components
import UserForm from "../forms/UserForm";

function Register() {
	const { values: userInfo, inputCommonProps } = useForm(USER_REGISTER_INITIAL_VALUES, false);

	// handle register user
	const handleSubmit = () => {
		console.log(userInfo);
	};

	return (
		<div className="max-w-lg mx-auto">
			<UserForm
				userInfo={userInfo}
				action="register"
				inputCommonProps={inputCommonProps}
				submitHandler={handleSubmit}
			/>
		</div>
	);
}

export default Register;
