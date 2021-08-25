import { useEffect, useState } from "react";

import Calendar from "../components/Calendar";
import EventsApi from "../api/EventsApi";
import NewCalendarEventDialog from "../dialogs/NewCalendarEventDialog";
import Title from "../components/Title";

export default function CalendarPage() {
	const [newEventConfig, setNewEventConfig] = useState({ open: false, date: null });
	const [events, setEvents] = useState([]);

	useEffect(() => {
		async function fetchEvents() {
			try {
				let { data } = await EventsApi.getAll();
				setEvents(data);
			} catch (e) {
				console.log(e);
			}
		}

		fetchEvents();
	}, []);

	return (
		<div className="mb-4">
			<Title>Calendar</Title>
			<Calendar
				onNewEvent={(date) => setNewEventConfig({ open: true, date: date })}
				events={events}
			/>
			<NewCalendarEventDialog
				open={newEventConfig.open}
				date={newEventConfig.date}
				onClose={() => setNewEventConfig({ open: false, date: null })}
			/>
		</div>
	);
}
