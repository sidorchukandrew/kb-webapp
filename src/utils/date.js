import dayjs from "dayjs";

export function toDate(date) {
	return date ? dayjs(date).toDate().toDateString() : "";
}
