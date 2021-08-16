export function constructAuthHeader() {
	let name = localStorage.getItem("name");
	let password = localStorage.getItem("password");

	return {
		Authorization: `${name}:${password}`,
	};
}

export function isFirstLogin(user) {
	return user.number_of_logins <= 1;
}
