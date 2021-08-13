import { useEffect, useState } from "react";

import EditEventDialog from "../dialogs/EditEventDialog";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import EventDetails from "../components/EventDetails";
import EventsApi from "../api/EventsApi";
import { IconButton } from "@material-ui/core";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
	const [loading, setLoading] = useState(true);
	const [event, setEvent] = useState();
	const [editing, setEditing] = useState(false);

	const id = useParams().id;

	useEffect(() => {
		async function fetchEvent() {
			setLoading(true);
			try {
				let { data } = await EventsApi.getOne(id);
				data.users = data.users?.map((user) => user.username);
				setEvent(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchEvent();
	}, [id]);

	return (
		<div className="my-10">
			<Loader loading={loading && !event}>
				<Title className="flex-between">
					{event?.description}
					<IconButton onClick={() => setEditing(true)}>
						<EditRoundedIcon />
					</IconButton>
				</Title>
				<EventDetails event={event} />
				<EditEventDialog
					event={event}
					open={editing}
					onClose={() => setEditing(false)}
					onSaved={setEvent}
				/>
			</Loader>
		</div>
	);
}
