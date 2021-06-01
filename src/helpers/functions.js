function getDateOnPeriod(period) {
	let currDate = new Date();
	const currDay = currDate.getDate();
	const currMonth = currDate.getMonth();
	const currYear = currDate.getFullYear();

	let endDate = new Date(`${currYear}-${currMonth + 1}-${currDay + 1}`);

	switch (period) {
		case "today":
			break;
		case "yesterday":
			endDate.setDate(currDay);
			currDate.setDate(currDay - 1);
			break;
		case "last-week":
			currDate.setDate(currDay - 7);
			break;
		case "last-month":
			currDate.setMonth(currMonth - 1);
	}

	const startDate = new Date(
		`${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`.replace(/\//g, "-")
	);
	return { startDate, endDate };
}

const userValidation = (firedInput, setErrors) => {
	const errors = {};
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/;
	const nameRegex = /^(?=.*\d)*(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
	const usernameRegex = /^(?=.*\d)*(?=.*[a-z])(?=.*[a-zA-Z]).{5,}$/;
	const webUrlRegex =
		/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	if ("fullName" in firedInput) {
		errors.fullName = valCond(
			nameRegex.test(firedInput.fullName),
			"Your Name Must be 8 letters at least"
		);
	}
	if ("username" in firedInput) {
		errors.username = valCond(
			usernameRegex.test(firedInput.username),
			"Username must be 5 letters at least"
		);
	}
	if ("email" in firedInput) {
		errors.email = valCond(emailRegex.test(firedInput.email), "Email is badly formatted");
	}
	if ("password" in firedInput) {
		errors.password = valCond(passwordRegex.test(firedInput.password), "Password isn't strong");
	}
	if ("website" in firedInput) {
		errors.website = valCond(
			firedInput.website == "" || webUrlRegex.test(firedInput.website),
			"Url is bad formatted"
		);
	}

	setErrors(errors);

	return Object.values(errors).every((input) => input == "");
};

// validation condition
const valCond = (condition, errMsg) => {
	return condition ? "" : `${errMsg}.`;
};

// DuplicatableKey => the key that may duplicate in the objects and causes them to duplicate
const removeDuplicatedObjsInArr = (array, duplicatableKey) => {
	const keys = array.map((key) => key[duplicatableKey]);
	const refinedKeys = [...new Set(keys)];
	const finalArray = refinedKeys.map((key) => array.find((item) => item[duplicatableKey] === key));

	return finalArray;
};

export { getDateOnPeriod, userValidation, removeDuplicatedObjsInArr };
