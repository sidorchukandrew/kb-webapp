import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { formatTooltip } from "../utils/chart";

export default function EarningsChart({ data }) {
	return (
		<ResponsiveContainer width="100%" height={200}>
			<PieChart width={200} height={400}>
				<Pie
					dataKey="value"
					cx="50%"
					cy="50%"
					innerRadius={40}
					outerRadius={80}
					fill="#82ca9d"
					data={data}
				>
					{data.map((entry, index) => (
						<Cell key={index} fill={COLORS[index]} />
					))}
				</Pie>
				<Tooltip formatter={formatTooltip} />
			</PieChart>
		</ResponsiveContainer>
	);
}

const COLORS = {
	0: "#8a53a5",
	1: "#ff813c",
};
