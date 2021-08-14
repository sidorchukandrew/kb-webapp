import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useMediaQuery,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/financial";
import { getNamesFromUsers } from "../utils/models";

export default function EventsTable({ events }) {
	const isSmallScreen = useMediaQuery("(max-width: 640px)");
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{!isSmallScreen && <TableCell>Paid Out</TableCell>}
						<TableCell>Date</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Revenue</TableCell>
						{!isSmallScreen && <TableCell>Earnings (per group)</TableCell>}
						<TableCell>Workers</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{events.map((event) => (
						<TableRow key={event.id} hover>
							{!isSmallScreen && (
								<TableCell>
									<Checkbox checked={event.is_paid_out} disabled />
								</TableCell>
							)}
							<TableCell scope="row">
								<Link to={`/events/${event.id}`}>{new Date(event.event_date).toDateString()}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/events/${event.id}`}>{event.description}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/events/${event.id}`}>${formatCurrency(event.revenue)}</Link>
							</TableCell>
							{!isSmallScreen && (
								<TableCell>
									<Link to={`/events/${event.id}`}>
										${formatCurrency(event.earnings_per_group)}
									</Link>
								</TableCell>
							)}
							<TableCell>
								<Link to={`/events/${event.id}`}>{getNamesFromUsers(event.users)}</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{events.length === 0 && (
				<div className="flex-center py-6 font-semibold text-gray-400">
					No events have been added yet
				</div>
			)}
		</TableContainer>
	);
}
