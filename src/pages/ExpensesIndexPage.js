import { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import ExpensesApi from "../api/ExpensesApi";
import ExpensesTable from "../components/ExpensesTable";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Title from "../components/Title";

export default function ExpensesIndexPage() {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchExpenses() {
			try {
				setLoading(true);
				let { data } = await ExpensesApi.getAll();
				setExpenses(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchExpenses();
	}, []);

	return (
		<>
			<Title>
				<div className="flex-between">
					Expenses
					<Link to="/expenses/new">
						<Button variant="contained" disableElevation color="primary">
							Record an expense
						</Button>
					</Link>
				</div>
			</Title>

			<Loader className="mt-10" loading={loading}>
				<ExpensesTable expenses={expenses} />
			</Loader>
		</>
	);
}
