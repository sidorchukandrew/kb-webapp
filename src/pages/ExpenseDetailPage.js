import { useEffect, useState } from "react";

import DeleteExpenseDialog from "../dialogs/DeleteExpenseDialog";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditExpenseDialog from "../dialogs/EditExpenseDialog";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ExpenseDetails from "../components/ExpenseDetails";
import ExpensesApi from "../api/ExpensesApi";
import { IconButton } from "@material-ui/core";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { formatCurrency } from "../utils/financial";
import { useParams } from "react-router-dom";

export default function ExpenseDetailPage() {
	const [loading, setLoading] = useState(true);
	const [expense, setExpense] = useState();
	const [editing, setEditing] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const id = useParams().id;

	useEffect(() => {
		async function fetchExpense() {
			setLoading(true);
			try {
				let { data } = await ExpensesApi.getOne(id);
				setExpense(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchExpense();
	}, [id]);

	return (
		<div className="my-4 sm:my-10">
			<Loader loading={loading && !expense}>
				<Title className="flex-between">
					{"$" + formatCurrency(expense?.amount)}

					<span className="w-32 flex justify-end items-center">
						<IconButton onClick={() => setEditing(true)}>
							<EditRoundedIcon />
						</IconButton>
						<IconButton onClick={() => setShowDeleteConfirmation(true)}>
							<DeleteRoundedIcon />
						</IconButton>
					</span>
				</Title>
				<ExpenseDetails expense={expense} />
				<DeleteExpenseDialog
					open={showDeleteConfirmation}
					onClose={() => setShowDeleteConfirmation(false)}
				/>
				<EditExpenseDialog
					expense={expense}
					open={editing}
					onClose={() => setEditing(false)}
					onSaved={setExpense}
				/>
			</Loader>
		</div>
	);
}
