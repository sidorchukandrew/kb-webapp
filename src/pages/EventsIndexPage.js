import { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import EventsApi from "../api/EventsApi";
import EventsTable from "../components/EventsTable";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Title from "../components/Title";

export default function EventsIndexPage() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchEvents() {
			try {
				let { data } = await EventsApi.getAll();
				setEvents(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchEvents();
	}, []);
	return (
		<div>
			<Title className="flex-between">
				Events
				<Link to="/events/new" style={{ textDecoration: "none" }}>
					<Button color="primary" variant="contained" disableElevation>
						Record an event
					</Button>
				</Link>
			</Title>
			<Loader loading={loading}>
				<EventsTable events={events} />
			</Loader>
		</div>
	);
}
