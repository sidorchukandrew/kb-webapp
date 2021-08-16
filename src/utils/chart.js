import { PIE_CHART_COLORS } from "./constants";
import { formatCurrency } from "./financial";

export function getColor(segment) {
	return PIE_CHART_COLORS[segment];
}

export function formatTooltip(value) {
	let formattedCurrency = "$" + formatCurrency(value);
	return formattedCurrency;
}

export function getEarningsChartData(data) {
	return [
		{ name: "Delivery fees", value: Number.parseFloat(data.group.delivery_fees_total) },
		{ name: "Earnings", value: Number.parseFloat(data.group.earnings_total) },
	];
}

export function getCompanyTotalsChartData(data) {
	return [
		{ name: "Tax", value: Number.parseFloat(data.total_tax) },
		{ name: "Delivery fees", value: Number.parseFloat(data.total_delivery_fees) },
		{ name: "Business account", value: Number.parseFloat(data.total_business_account) },
		{ name: "Event costs", value: Number.parseFloat(data.total_event_costs) },
		{ name: "Paid earnings", value: Number.parseFloat(data.total_paid_out_earnings) },
		{ name: "Unpaid earnings", value: Number.parseFloat(data.total_unpaid_earnings) },
	];
}
