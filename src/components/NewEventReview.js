import { formatCurrency, performCalculations, toChartData } from "../utils/financial";

import CalculationsChart from "./CalculationsChart";
import Card from "./Card";
import Data from "./Data";
import EarningsTable from "./EarningsTable";
import { useState } from "react";

export default function NewEventReview({ form }) {
	const [calculations] = useState(() => performCalculations(form));

	return (
		<div>
			<Card className="mb-4" title="Details">
				<Data label="Workers:" data={form.workers.join(", ")} />
				<Data label="Description of event:" data={form.description} />
				<Data label="Date:" data={form.date?.toDateString()} />
			</Card>

			<Card title="Financials">
				<Data label="Total revenue:" data={"$ " + formatCurrency(form.revenue)} />

				{calculations?.eventCost && (
					<Data
						label={`Event cost ${calculations.eventCostLabel}:`}
						data={"$" + formatCurrency(calculations?.eventCost)}
					/>
				)}

				<Data
					label="Business account (50%):"
					data={"$ " + formatCurrency(calculations?.businessAccountAmount)}
				/>

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

				<EarningsTable form={form} calculations={calculations} />
				<CalculationsChart data={toChartData(calculations, form) || []} />
			</Card>
		</div>
	);
}
