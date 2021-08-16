import { formatCurrency, performCalculations, toChartData } from "../utils/financial";
import { useEffect, useState } from "react";

import CalculationsChart from "../charts/CalculationsChart";
import Card from "./Card";
import { Checkbox } from "@material-ui/core";
import Data from "./Data";
import EarningsTable from "./EarningsTable";
import EventsApi from "../api/EventsApi";

export default function EventDetails({ event, onEventUpdated }) {
	const [calculations, setCalculations] = useState(() => performCalculations(event));

	useEffect(() => {
		setCalculations(performCalculations(event));
	}, [event]);

	const handleUpdatePaidOut = async () => {
		try {
			onEventUpdated({ ...event, is_paid_out: !event.is_paid_out });

			let { data } = await EventsApi.updateOne(event.id, { is_paid_out: !event.is_paid_out });
			data.users = data.users?.map((user) => user.username);
			data.workers = data.users;
			onEventUpdated(data);
		} catch (error) {
			console.log(error);
		}
	};

	if (event) {
		return (
			<div>
				<Card title="Details" className="mb-4">
					<Data label="Date:" data={new Date(event.event_date).toDateString()} />
					<Data label="Workers:" data={event.users.join(", ")} />
					<Data
						label="Workers have been paid:"
						data={<Checkbox checked={event.is_paid_out} onChange={handleUpdatePaidOut} />}
					/>
				</Card>
				<Card title="Financials">
					<Data label="Total revenue:" data={"$ " + formatCurrency(event.revenue)} />
					{calculations?.tax && (
						<Data
							label={`Tax ${calculations.taxLabel}:`}
							data={"$ " + formatCurrency(calculations?.tax)}
						/>
					)}
					{calculations?.eventCost && (
						<Data
							label={`Event cost ${calculations.eventCostLabel}:`}
							data={"$" + formatCurrency(calculations?.eventCost)}
						/>
					)}

					{calculations?.deliveryFee && (
						<Data
							label={`Delivery fee ${calculations.deliveryFeeLabel}:`}
							data={"$ " + formatCurrency(calculations?.deliveryFee)}
						/>
					)}
					<Data
						label="Business account (50%):"
						data={"$ " + formatCurrency(calculations?.businessAccountAmount)}
					/>

					<Data
						label="Earnings:"
						data={"$" + formatCurrency(calculations?.revenueAfterBusinessAccount)}
					/>

					<EarningsTable form={event} calculations={calculations} />
					<CalculationsChart data={toChartData(calculations, event) || []} />
				</Card>
			</div>
		);
	} else {
		return null;
	}
}
