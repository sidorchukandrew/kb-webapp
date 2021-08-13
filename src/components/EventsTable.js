import { Table, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

import { Link } from "react-router-dom";
import { TableBody } from "@material-ui/core";
import { formatCurrency } from "../utils/financial";
import { getNamesFromUsers } from "../utils/models";

export default function EventsTable({ events }) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Revenue</TableCell>
						<TableCell>Earnings (per group)</TableCell>
						<TableCell>Workers</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{events.map((event) => (
						<TableRow key={event.id} hover>
							<TableCell scope="row">
								<Link to={`/events/${event.id}`}>{new Date(event.event_date).toDateString()}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/events/${event.id}`}>{event.description}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/events/${event.id}`}>${formatCurrency(event.revenue)}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/events/${event.id}`}>${formatCurrency(event.earnings_per_group)}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/events/${event.id}`}>{getNamesFromUsers(event.users)}</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
