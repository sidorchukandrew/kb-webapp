import { Button } from "@material-ui/core";
import CalendarEvents from "./CalendarEvents";
import { filterEventsByDay } from "../utils/date";
import { useStyles } from "./Calendar";

export default function CalendarCell({ date, className, onDateClick, events, onShowEventsDialog }) {
	const classes = useStyles();

	const todaysEvents = () => {
		return filterEventsByDay(date.fullDate, events);
	};

	if (date) {
		return (
			<div className={`col-span-1 h-32 w-full p-1 ${className}`}>
				<Button
					className={classes.root}
					variant={date.isToday ? "contained" : "text"}
					disableElevation
					color={date.isToday ? "primary" : ""}
					onClick={() => onDateClick(date.fullDate)}
				>
					{date.dateNumber}
				</Button>

				<CalendarEvents events={todaysEvents()} onShowEventsDialog={onShowEventsDialog} />
			</div>
		);
	} else {
		return <div className={`col-span-1 h-32 w-full py-1 ${className}`}></div>;
	}
}
