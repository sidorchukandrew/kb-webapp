import { getCompanyTotalsChartData, getEarningsChartData } from "../utils/chart";

import Card from "./Card";
import CompanyTotalsChart from "../charts/CompanyTotalsChart";
import Data from "./Data";
import EarningsChart from "../charts/EarningsChart";
import { formatCurrency } from "../utils/financial";

export default function Dashboard({ data }) {
	return (
		<>
			<Card title={`Your Earnings (${data.group.name})`} className="mb-4">
				<div className="grid grid-cols-2">
					<div className="col-span-1">
						<Data label={`Attended events:`} data={data.group?.events?.length} />
						<Data label="Amount earned:" data={"$" + formatCurrency(data.group.amount_earned)} />
						<Data
							label="Delivery fees total:"
							data={"$" + formatCurrency(data.group.delivery_fees_total)}
						/>
						<Data label="Earnings total:" data={"$" + formatCurrency(data.group.earnings_total)} />
					</div>
					<div className="col-span-1 flex-center">
						<EarningsChart data={getEarningsChartData(data)} />
					</div>
				</div>
			</Card>

			<Card title="Company Totals" className="mb-4">
				<div className="grid grid-cols-2">
					<div className="col-span-1">
						<Data label="Revenue:" data={"$" + formatCurrency(data.total_revenue)} />
						<Data
							label="Business account:"
							data={"$" + formatCurrency(data.total_business_account)}
						/>
						<Data label="Delivery fees:" data={"$" + formatCurrency(data.total_delivery_fees)} />
						<Data label="Event costs:" data={"$" + formatCurrency(data.total_event_costs)} />
						<Data label="Earnings:" data={"$" + formatCurrency(data.total_earnings)} />
						<Data
							label="Paid out earnings:"
							data={"$" + formatCurrency(data.total_paid_out_earnings)}
						/>

						<Data
							label="Unpaid earnings:"
							data={"$" + formatCurrency(data.total_unpaid_earnings)}
						/>
					</div>
					<div className="col-span-1 flex-center">
						<CompanyTotalsChart data={getCompanyTotalsChartData(data)} />
					</div>
				</div>
			</Card>
			<Card title="Other's Earnings" className="mb-4"></Card>
		</>
	);
}
