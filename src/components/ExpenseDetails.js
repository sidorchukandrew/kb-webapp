import Card from "./Card";
import Data from "./Data";
import { capitalize } from "@material-ui/core";
import { toDate } from "../utils/date";

export default function ExpenseDetails({ expense }) {
	if (expense) {
		return (
			<div>
				<Card title="Details">
					<Data label="Date:" data={toDate(expense.expense_date)} />
					<Data label="Description:" data={expense.description} />
					{expense.channel && <Data label="Channel:" data={capitalize(expense.channel)} />}
				</Card>
			</div>
		);
	} else {
		return null;
	}
}
