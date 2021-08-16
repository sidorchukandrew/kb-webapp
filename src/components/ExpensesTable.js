import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useMediaQuery,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/financial";
import { toDate } from "../utils/date";

export default function ExpensesTable({ expenses }) {
	const isSmallScreen = useMediaQuery("(max-width: 640px)");
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Amount</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Description</TableCell>
						{!isSmallScreen && <TableCell>Channel</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses?.map((expense) => (
						<TableRow key={expense.id}>
							<TableCell>
								<Link to={`/expenses/${expense.id}`}>{"$" + formatCurrency(expense.amount)}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/expenses/${expense.id}`}>{toDate(expense.expense_date)}</Link>
							</TableCell>
							<TableCell>
								<Link to={`/expenses/${expense.id}`}>{expense.description}</Link>
							</TableCell>
							{!isSmallScreen && (
								<TableCell>
									<Link to={`/expenses/${expense.id}`}>{expense.channel}</Link>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
			{expenses.length === 0 && (
				<div className="flex-center py-6 font-semibold text-gray-400">
					No expenses have been added yet
				</div>
			)}
		</TableContainer>
	);
}
