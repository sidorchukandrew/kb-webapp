import { PIE_CHART_COLORS } from "./constants";
import { formatCurrency } from "./financial";

export function getColor(segment) {
	return PIE_CHART_COLORS[segment];
}

export function formatTooltip(value) {
	let formattedCurrency = "$" + formatCurrency(value);
	return formattedCurrency;
}
