import { Button } from "@material-ui/core";
import Data from "./Data";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/financial";

export default function CalendarEventDetails({ event }) {
	const workers = event?.users?.map((user) => user.username) || [];

	return (
		<div className="p-3 text-sm">
			<h3 className="font-semibold text-lg mb-4">{event.description}</h3>
			<Data label="Revenue:" data={"$" + formatCurrency(event.revenue)} />
			<Data label="Workers:" data={workers.join(", ")} />

			<Link to={`/events/${event.id}`}>
				<Button size="small">View Details</Button>
			</Link>
		</div>
	);
}
