import CalendarCell from "./CalendarCell";
import { useMediaQuery } from "@material-ui/core";

export default function CalendarRow({ days, className, onDateClick, events, onShowEventsDialog }) {
	const isSmallScreen = useMediaQuery("(max-width: 640px)");
	return (
		<div className={`grid grid-cols-7 ${className}`}>
			<CalendarCell
				date={days[0]}
				className={!isSmallScreen && "border-r"}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarCell
				date={days[1]}
				className={!isSmallScreen && "border-r"}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarCell
				date={days[2]}
				className={!isSmallScreen && "border-r"}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarCell
				date={days[3]}
				className={!isSmallScreen && "border-r"}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarCell
				date={days[4]}
				className={!isSmallScreen && "border-r"}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarCell
				date={days[5]}
				className={!isSmallScreen && "border-r"}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarCell
				date={days[6]}
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
		</div>
	);
}
