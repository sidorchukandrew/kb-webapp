import FormField from "../components/FormField";

export default function CalendarEventForm({ form }) {
	return (
		<div>
			<FormField type="date" value={form.date} />
		</div>
	);
}
