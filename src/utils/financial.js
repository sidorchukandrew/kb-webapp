export function performCalculations(form) {
	let calculations = {};

	if (hasEventCost(form)) {
		if (form.event_cost_percentage) {
			calculations.eventCost = calculatePercentage(form.event_cost_percentage, form.revenue);
			calculations.eventCostLabel = ` (${Number.parseFloat(form.event_cost_percentage)}%)`;
		} else {
			calculations.eventCost = Number.parseFloat(form.event_cost_flat_fee);
			calculations.eventCostLabel = ` (flat fee)`;
		}

		calculations.revenueAfterEventCost = form.revenue - calculations.eventCost;
	} else {
		calculations.revenueAfterEventCost = form.revenue;
	}

	calculations.businessAccountAmount = calculatePercentage(50, calculations.revenueAfterEventCost);

	calculations.revenueAfterBusinessAccount =
		calculations.revenueAfterEventCost - calculations.businessAccountAmount;

	if (hasDeliveryFee(form)) {
		calculations.deliveryFee = form.delivery_fee;
		calculations.revenueAfterDeliveryFee =
			calculations.revenueAfterBusinessAccount - calculations.deliveryFee;
		calculations.deliveryFeeLabel = `(${form.delivery_driver})`;
	} else {
		calculations.revenueAfterDeliveryFee = calculations.revenueAfterBusinessAccount;
	}

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

export function formatCurrency(number) {
	number = Number.parseFloat(number);
	return number?.toFixed(2);
}

export function hasDeliveryFee(form) {
	return form && "delivery_fee" in form && form.delivery_fee;
}

export function toChartData(calculations, form) {
	let chartData = [];

	if ("eventCost" in calculations) {
		chartData.push({ name: "Event Fee", value: Number.parseFloat(calculations.eventCost) });
	}

	chartData.push({
		name: "Business Account",
		value: Number.parseFloat(calculations.businessAccountAmount),
	});

	let groups = getWorkerGroups(form);

	let groupEarning = calculations.revenueAfterDeliveryFee / groups.length;

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
