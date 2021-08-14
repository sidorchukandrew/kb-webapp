import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	useMediaQuery,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/financial";
import { getNamesFromUsers } from "../utils/models";
import { order } from "../utils/compare";
import { useState } from "react";

export default function EventsTable({ events }) {
	const [orderBy, setOrderBy] = useState();
	const [orderDirection, setOrderDirection] = useState();

	const handleOrderBy = (field) => {
		setOrderBy(field);
		setOrderDirection((currentDirection) => {
			if (field === orderBy) {
				return currentDirection === "asc" ? "desc" : "asc";
			} else {
				return "asc";
			}
		});
	};

	const orderEvents = () => {
		if (orderBy && orderDirection) {
			return order(events, orderBy, orderDirection);
		} else {
			return events;
		}
	};

	const isSmallScreen = useMediaQuery("(max-width: 640px)");
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{!isSmallScreen && <TableCell>Paid Out</TableCell>}
						<TableCell sortDirection="asc">
							<TableSortLabel
								onClick={() => handleOrderBy("event_date")}
								active={orderBy === "event_date"}
								direction={orderDirection}
							>
								Date
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								onClick={() => handleOrderBy("description")}
								active={orderBy === "description"}
								direction={orderDirection}
							>
								Description
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								onClick={() => handleOrderBy("revenue")}
								active={orderBy === "revenue"}
								direction={orderDirection}
							>
								Revenue
							</TableSortLabel>
						</TableCell>
						{!isSmallScreen && (
							<TableCell>
								<TableSortLabel
									onClick={() => handleOrderBy("earnings_per_group")}
									active={orderBy === "earnings_per_group"}
									direction={orderDirection}
								>
									Earnings (per group)
								</TableSortLabel>
							</TableCell>
						)}
						<TableCell>Workers</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{orderEvents().map((event) => (
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
