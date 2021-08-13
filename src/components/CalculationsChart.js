import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatTooltip, getColor } from "../utils/chart";

import { formatCurrency } from "../utils/financial";
import { useState } from "react";

export default function CalculationsChart({ data }) {
	const [selectedSegment, setSelectedSegment] = useState("Click a segment");

	const handleSelectSegment = (segment) => {
		setSelectedSegment(`${segment.name}: $${formatCurrency(segment.value)}`);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<div className="col-span-1">
				<ResponsiveContainer width="100%" height={200}>
					<PieChart width={400} height={400}>
						<Pie
							dataKey="value"
							cx="50%"
							cy="50%"
							innerRadius={40}
							outerRadius={80}
							fill="#82ca9d"
							data={data}
							onClick={handleSelectSegment}
						>
							{data.map((entry, index) => (
								<Cell key={index} fill={getColor(entry.name)} />
							))}
						</Pie>
						<Tooltip formatter={formatTooltip} />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className="flex justify-start items-center col-span-1 text-lg font-semibold">
				{selectedSegment}
			</div>
		</div>
	);
}
