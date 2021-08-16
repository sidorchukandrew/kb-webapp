export function capitalize(text = "") {
	if (text) {
		return text.charAt(0).toUpperCase() + text.substring(1);
	} else {
		return text;
	}
}
