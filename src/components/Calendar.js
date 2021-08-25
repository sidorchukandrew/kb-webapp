import { filterEventsByMonth, getCalendarDates, getCalendarTitle } from "../utils/date";
import { useEffect, useState } from "react";

import CalendarBody from "./CalendarBody";
import CalendarEventsDialog from "../dialogs/CalendarEventsDialog";
import CalendarHeader from "./CalendarHeader";
import { MONTH_NUMBERS } from "../utils/constants";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
	root: {
		borderRadius: "50%",
		width: "30px",
		height: "30px",
		maxWidth: "30px",
		minWidth: "20px",
	},
}));

export default function Calendar({ onNewEvent, events }) {
	const [month, setMonth] = useState(dayjs().month());
	const [year, setYear] = useState(dayjs().year());
	const [calendarWeeks, setCalendarWeeks] = useState(null);
	const [dialogConfig, setDialogConfig] = useState({ open: false, events: [] });

	useEffect(() => {
		setCalendarWeeks(getCalendarDates(month, year));
	}, [month, year]);

	const handleIncrement = () => {
		setMonth((currentMonth) => {
			if (currentMonth === MONTH_NUMBERS.DECEMBER) {
				setYear((currentYear) => currentYear + 1);
			}

			return (currentMonth + 1) % 12;
		});
	};

	const handleDecrement = () => {
		setMonth((currentMonth) => {
			if (currentMonth === 1) {
				setYear((currentYear) => currentYear - 1);
			}

			return currentMonth - 1 < 0 ? MONTH_NUMBERS.DECEMBER : currentMonth - 1;
		});
	};

	const filterThisMonthsEvents = () => {
		return filterEventsByMonth(month, year, events);
	};

	return (
		<div className="text-center">
			<CalendarHeader
				title={getCalendarTitle(month, year)}
				onPrevious={handleDecrement}
				onNext={handleIncrement}
			/>
			{calendarWeeks && (
				<CalendarBody
					weeks={calendarWeeks}
					onDateClick={onNewEvent}
					events={filterThisMonthsEvents()}
					onShowEventsDialog={(eventsOnDate) =>
						setDialogConfig({ open: true, events: eventsOnDate })
					}
				/>
			)}
			<CalendarEventsDialog
				open={dialogConfig.open}
				onClose={() => setDialogConfig({ open: false })}
				events={dialogConfig.events}
			/>
		</div>
	);
}
