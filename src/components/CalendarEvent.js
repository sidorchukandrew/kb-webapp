import CalendarEventDetails from "./CalendarEventDetails";
import { Popover } from "@material-ui/core";
import { useState } from "react";

export default function CalendarEvent({ event }) {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	return (
		<>
			<button
				onClick={handleClick}
				className={
					`text-left outline-none focus:outline-none w-full rounded-md ` +
					` py-1 px-2  bg-green-200 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis`
				}
			>
				{event.description}
			</button>
			<Popover
				anchorOrigin={{
					vertical: "center",
					horizontal: "left",
				}}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				anchorEl={anchorEl}
			>
				<CalendarEventDetails event={event} />
			</Popover>
		</>
	);
}
