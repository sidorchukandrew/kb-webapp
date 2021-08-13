import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Title from "../components/Title";

export default function EventsIndexPage() {
	return (
		<div>
			<Title className="flex-between">
				Events
				<Link to="/events/new" style={{ textDecoration: "none" }}>
					<Button color="primary" variant="contained">
						Record an event
					</Button>
				</Link>
			</Title>
		</div>
	);
}
