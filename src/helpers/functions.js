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

export { getDateOnPeriod };
