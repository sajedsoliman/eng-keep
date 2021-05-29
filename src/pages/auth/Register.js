import { useState } from "react";
// Hooks
import { useForm } from "../../hooks/useForm";

// Info - functions
import { USER_REGISTER_INITIAL_VALUES } from "../../helpers/info";
import { userValidation } from "../../helpers/functions";

// Components
import UserForm from "../../forms/UserForm";
import Store from "../../back-ends/Store";

function Register() {
	// State vars
	const [avatar, setAvatar] = useState(null);

	// Import useForm hook to control users' inputs
	const {
		values: userInfo,
		inputCommonProps,
		setErrors,
		validationErrors,
		resetForm,
	} = useForm(USER_REGISTER_INITIAL_VALUES, false, userValidation);

	// Import Store component to handle registering the user
	const { handleRegisterUser, loading } = Store();

	// handle add an avatar
	const handleAddAvatar = (file) => {
		setAvatar(file);
	};

	// handle register user
	const handleSubmit = () => {
		const fullUserInfo = { ...userInfo, avatar };

		// register the user if there is no error
		if (userValidation(userInfo, setErrors)) {
			handleRegisterUser(fullUserInfo);

			// reset the form
			resetForm();
		}
	};

	return (
		<div className="max-w-lg mx-auto">
			<UserForm
				userInfo={userInfo}
				action="register"
				inputCommonProps={inputCommonProps}
				submitHandler={handleSubmit}
				handleAddAvatar={handleAddAvatar}
				validationErrors={validationErrors}
				actionLoading={loading}
			/>
		</div>
	);
}

export default Register;
