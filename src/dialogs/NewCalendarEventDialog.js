import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useEffect, useState } from "react";

import CalendarEventForm from "../components/CalendarEventForm";

export default function NewCalendarEventDialog({ open, onClose, date }) {
	const [form, setForm] = useState({});

	useEffect(() => setForm((currentForm) => ({ ...currentForm, date })), [date]);

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxSize="sm">
			<DialogTitle>New Event</DialogTitle>
			<DialogContent>
				<CalendarEventForm form={form} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" color="primary" disableElevation>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}
