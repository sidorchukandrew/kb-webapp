import Card from "./Card";
import Data from "./Data";
import EarningsChart from "./EarningsChart";
import { formatCurrency } from "../utils/financial";

export default function Dashboard({ data }) {
	return (
		<>
			<Card title={`Your Earnings (${data.group})`}>
				<div className="grid grid-cols-2">
					<div className="col-span-1">
						<Data label={`Attended events:`} data={data.events?.length} />
						<Data label="Amount earned:" data={"$" + formatCurrency(data.amount_earned)} />
						<Data
							label="Delivery fees total:"
							data={"$" + formatCurrency(data.delivery_fees_total)}
						/>
						<Data label="Earnings total:" data={"$" + formatCurrency(data.earnings_total)} />
					</div>
					<div className="col-span-1 flex-center">
						<EarningsChart data={getEarningsChartData(data)} />
					</div>
				</div>
			</Card>
		</>
	);
}

function getEarningsChartData(data) {
	return [
		{ name: "Delivery fees", value: Number.parseFloat(data.delivery_fees_total) },
		{ name: "Earnings", value: Number.parseFloat(data.earnings_total) },
	];
}
