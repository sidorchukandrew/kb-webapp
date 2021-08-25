import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

import CalendarEvent from "../components/CalendarEvent";
import { toDate } from "../utils/date";

export default function CalendarEventsDialog({ events, open, onClose }) {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			{events && events[0] && <DialogTitle>Events on {toDate(events[0].event_date)}</DialogTitle>}
			<DialogContent>
				<div className="flex flex-col gap-2  mx-auto">
					{events?.map((event) => (
						<CalendarEvent event={event} key={event.id} />
					))}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}
