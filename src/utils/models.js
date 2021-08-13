export function getNamesFromUsers(users) {
	let names = "";

	users.forEach((user, index) => {
		if (index < users.length - 1) {
			names += `${user.username}, `;
		} else {
			names += user.username;
		}
	});

	return names;
}
