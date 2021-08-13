import { formatCurrency, performCalculations, toChartData } from "../utils/financial";
import { useEffect, useState } from "react";

import CalculationsChart from "./CalculationsChart";
import Card from "./Card";
import Data from "./Data";
import EarningsTable from "./EarningsTable";

export default function EventDetails({ event }) {
	const [calculations, setCalculations] = useState(() => performCalculations(event));

	useEffect(() => {
		console.log("Redoing calculations");
		setCalculations(performCalculations(event));
	}, [event]);

	if (event) {
		return (
			<div>
				<Card title="Details" className="mb-4">
					<Data label="Date:" data={new Date(event.event_date).toDateString()} />
					<Data label="Workers:" data={event.users.join(", ")} />
				</Card>
				<Card title="Financials">
					<Data label="Total revenue:" data={"$ " + formatCurrency(event.revenue)} />
					<Data
						label="Business account (50%):"
						data={"$ " + formatCurrency(calculations?.businessAccountAmount)}
					/>

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
						label="Earnings:"
						data={"$" + formatCurrency(calculations?.revenueAfterDeliveryFee)}
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
