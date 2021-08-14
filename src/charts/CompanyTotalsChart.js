import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { formatTooltip } from "../utils/chart";

export default function CompanyTotalsChart({ data }) {
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
	0: "#ffa600",
	1: "#8a53a5",
	2: "#e95d6a",
	3: "#115293",
	4: "red",
};
