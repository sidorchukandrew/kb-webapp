import CalendarEvent from "./CalendarEvent";
import { useMediaQuery } from "@material-ui/core";

export default function CalendarEvents({ events, onShowEventsDialog }) {
	const isSmallScreen = useMediaQuery("(max-width: 450px)");

	if (isSmallScreen) {
		return (
			<div>
				{events.length > 0 && (
					<button
						className="outline-none focus:outline-none flex-center w-full mt-2"
						onClick={() => onShowEventsDialog(events)}
					>
						<span className="w-3 h-3 rounded-full bg-green-400 transform border-white border"></span>
						{/* <span className="w-3 h-3 rounded-full bg-red-400 border border-white "></span> */}
					</button>
				)}
			</div>
		);
	} else {
		return (
			<div className="pt-1 flex flex-col gap-1">
				{events?.map((event) => (
					<CalendarEvent key={event.id} event={event} />
				))}
			</div>
		);
	}
}
