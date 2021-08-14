export function order(items, field, direction) {
	if (items) {
		let itemsCopy = [...items];
		itemsCopy.sort((itemA, itemB) => {
			let fieldA = itemA[field];
			let fieldB = itemB[field];

			console.log("comparing", fieldA, "to", fieldB);

			if (fieldA < fieldB) {
				return direction === "asc" ? -1 : 1;
			} else if (fieldA > fieldB) {
				return direction === "asc" ? 1 : -1;
			} else {
				return 0;
			}
		});

		return itemsCopy;
	} else {
		return items;
	}
}
