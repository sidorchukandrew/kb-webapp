import dayjs from "dayjs";

export function toDate(date) {
	return date ? dayjs(date).toDate().toDateString() : "";
}

export function getCalendarDates(month = dayjs().month(), year = dayjs().year()) {
	let daysInMonth = dayjs().set("year", year).set("month", month).daysInMonth();
	let calendarWeeks = [[], [], [], [], [], []];
	let calendarWeekNumber = 0;

	calendarWeeks[0] = padLeft(month, year);
	for (let day = 1; day <= daysInMonth; ++day) {
		let date = dayjs().set("year", year).set("month", month).date(day);

		if (isNewWeek(date)) {
			++calendarWeekNumber;
		}

		calendarWeeks[calendarWeekNumber].push({
			fullDate: date.toDate(),
			dateNumber: day,
			isToday: checkIfIsToday(date),
		});
	}

	calendarWeeks[4] = padRight(calendarWeeks[4], month, year);
	return calendarWeeks;
}

function isNewWeek(date) {
	return date.day() === 0 && date.date() !== 1;
}

function padLeft(month, year) {
	let startOfMonth = dayjs().set("year", year).set("month", month).date(1);
	let numToPad = startOfMonth.day();
	let firstWeek = [];

	while (numToPad-- > 0) {
		firstWeek.push(null);
	}

	return firstWeek;
}

function padRight(calendarWeek, month, year) {
	let endOfMonth = dayjs().set("year", year).set("month", month).endOf("month");
	let numToPad = 6 - endOfMonth.day();

	for (let i = 0; i < numToPad; ++i) {
		calendarWeek.push(null);
	}

	return calendarWeek;
}

function checkIfIsToday(dateInQuestion) {
	return dateInQuestion.isSame(dayjs());
}

export function getCalendarTitle(month, year) {
	return dayjs().set("year", year).set("month", month).format("MMMM YYYY");
}

export function filterEventsByMonth(month, year, events = []) {
	let filteredEvents = events.filter((event) => {
		let date = dayjs(event.event_date);
		return date.month() === month && date.year() === year;
	});

	return filteredEvents;
}

export function filterEventsByDay(date, events) {
	let filteredEvents = events.filter((event) => {
		let dateToCompareAgainst = dayjs(date);
		let eventDate = dayjs(event.event_date);

		return dateToCompareAgainst.isSame(eventDate, "day");
	});

	return filteredEvents;
}
