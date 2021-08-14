import { formatCurrency, getWorkerGroups, hasDeliveryFee } from "../utils/financial";
import { useEffect, useState } from "react";

export default function EarningsTable({ form, calculations }) {
	const [workerGroups, setWorkerGroups] = useState(() => getWorkerGroups(form));

	useEffect(() => {
		setWorkerGroups(getWorkerGroups(form));
	}, [form]);

	const calculateSplitEarnings = () => {
		return Number.parseFloat(calculations?.revenueAfterBusinessAccount / workerGroups.length);
	};

	const isDeliveryDriver = (group) => {
		return group.indexOf(form.delivery_driver) > -1;
	};

	const calculateGroupTotal = (group) => {
		let splitEarnings = calculateSplitEarnings();
		let total = splitEarnings;

		if (hasDeliveryFee(form) && isDeliveryDriver(group)) {
			total = total + Number.parseFloat(calculations.deliveryFee);
		}

		return formatCurrency(total);
	};

	return (
		<table className="w-full mb-4">
			<thead>
				<tr className="border-b">
					<td></td>
					{workerGroups.map((group, index) => (
						<td key={index} className="w-1/3 font-bold py-2 mx-2">
							{group}
						</td>
					))}
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="font-semibold pr-4">Earnings</td>
					{workerGroups.map((group, index) => (
						<td key={index} className="py-2">
							${formatCurrency(calculateSplitEarnings())}
						</td>
					))}
				</tr>
				{hasDeliveryFee(form) && (
					<tr>
						<td className="py-2 pr-4 sm:pr-8 font-semibold">Delivery</td>
						{workerGroups.map((group, index) => (
							<td key={index}>
								$
								{isDeliveryDriver(group)
									? formatCurrency(calculations.deliveryFee)
									: formatCurrency(0)}
							</td>
						))}
					</tr>
				)}
			</tbody>
			<tfoot>
				<tr>
					<td className="py-2">Total</td>
					{workerGroups.map((group, index) => (
						<td key={index} className="font-bold">
							${calculateGroupTotal(group)}
						</td>
					))}
				</tr>
			</tfoot>
		</table>
	);
}
