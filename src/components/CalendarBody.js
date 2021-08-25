import CalendarRow from "./CalendarRow";
import { useMediaQuery } from "@material-ui/core";

export default function CalendarBody({ weeks, onDateClick, events, onShowEventsDialog }) {
	const isSmallScreen = useMediaQuery("(max-width: 640px)");

	return (
		<div className={`${!isSmallScreen && "border rounded-md"} border-t `}>
			<CalendarRow
				days={weeks[0]}
				className="border-b"
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarRow
				days={weeks[1]}
				className="border-b"
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarRow
				days={weeks[2]}
				className="border-b"
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarRow
				days={weeks[3]}
				className="border-b"
				onDateClick={onDateClick}
				events={events}
				onShowEventsDialog={onShowEventsDialog}
			/>
			<CalendarRow days={weeks[4]} onDateClick={onDateClick} events={events} />
			{weeks[5][0] && (
				<CalendarRow
					days={weeks[5]}
					className="border-t"
					onDateClick={onDateClick}
					events={events}
					onShowEventsDialog={onShowEventsDialog}
				/>
			)}
		</div>
	);
}
