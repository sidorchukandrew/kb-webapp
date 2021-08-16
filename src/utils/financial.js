export function performCalculations(form) {
	let calculations = {};

	if (hasTax(form)) {
		if (form.tax_percentage) {
			calculations.tax = calculatePercentage(form.tax_percentage, form.revenue);
			calculations.taxLabel = ` (${Number.parseFloat(form.tax_percentage)}%)`;
		} else {
			calculations.tax = Number.parseFloat(form.tax_flat_fee);
			// calculations.taxLabel = ` (flat fee)`;
			calculations.taxLabel = "";
		}

		calculations.revenueAfterTax = form.revenue - calculations.tax;
	} else {
		calculations.revenueAfterTax = Number.parseFloat(form.revenue);
	}

	if (hasEventCost(form)) {
		if (form.event_cost_percentage) {
			calculations.eventCost = calculatePercentage(form.event_cost_percentage, form.revenue);
			calculations.eventCostLabel = ` (${Number.parseFloat(form.event_cost_percentage)}%)`;
		} else {
			calculations.eventCost = Number.parseFloat(form.event_cost_flat_fee);
			calculations.eventCostLabel = ` (flat fee)`;
		}

		calculations.revenueAfterEventCost = calculations.revenueAfterTax - calculations.eventCost;
	} else {
		calculations.revenueAfterEventCost = Number.parseFloat(calculations.revenueAfterTax);
	}

	if (hasDeliveryFee(form)) {
		calculations.deliveryFee = form.delivery_fee;
		calculations.revenueAfterDeliveryFee =
			calculations.revenueAfterEventCost - calculations.deliveryFee;
		calculations.deliveryFeeLabel = `(${form.delivery_driver})`;
	} else {
		calculations.revenueAfterDeliveryFee = calculations.revenueAfterEventCost;
	}

	calculations.businessAccountAmount = calculatePercentage(
		50,
		calculations.revenueAfterDeliveryFee
	);

	calculations.revenueAfterBusinessAccount =
		calculations.revenueAfterDeliveryFee - calculations.businessAccountAmount;

	return calculations;
}

function calculatePercentage(percent, total) {
	return (total * percent) / 100;
}

export function hasEventCost(form) {
	return (
		form &&
		("event_cost_percentage" in form || "event_cost_flat_fee" in form) &&
		(form.event_cost_percentage || form.event_cost_flat_fee)
	);
}

export function hasTax(form) {
	return (
		form &&
		("tax_percentage" in form || "tax_flat_fee" in form) &&
		(form.tax_percentage || form.tax_flat_fee)
	);
}

export function formatCurrency(number) {
	number = Number.parseFloat(number);
	return number?.toFixed(2);
}

export function hasDeliveryFee(form) {
	return form && "delivery_fee" in form && form.delivery_fee;
}

export function toChartData(calculations, form) {
	let chartData = [];

	if ("tax" in calculations) {
		chartData.push({ name: "Tax", value: Number.parseFloat(calculations.tax) });
	}

	if ("eventCost" in calculations) {
		chartData.push({ name: "Event Fee", value: Number.parseFloat(calculations.eventCost) });
	}

	chartData.push({
		name: "Business Account",
		value: Number.parseFloat(calculations.businessAccountAmount),
	});

	let groups = getWorkerGroups(form);

	let groupEarning = calculations.revenueAfterBusinessAccount / groups.length;

	groups.forEach((group) => {
		chartData.push({ name: `${group}'s earnings`, value: groupEarning });
		if ("deliveryFee" in calculations && isDeliveryDriver(form.delivery_driver, group)) {
			chartData.push({
				name: `Delivery fee (${form.delivery_driver})`,
				value: Number.parseFloat(calculations.deliveryFee),
			});
		}
	});

	return chartData;
}

export function getWorkerGroups(form) {
	let groups = [];

	let workers = form.workers || form.users;

	if (workers.includes("Andrew") || workers.includes("Tayeesa")) {
		groups.push("Andrew & Tayeesa");
	}

	if (workers.includes("David") || workers.includes("Maryana")) {
		groups.push("David & Maryana");
	}

	if (workers.includes("Paul")) {
		groups.push("Paul");
	}

	return groups;
}

function isDeliveryDriver(deliveryDriver, group) {
	return group.indexOf(deliveryDriver) > -1;
}
