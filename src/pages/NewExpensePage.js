import { Button, FormControlLabel, Switch } from "@material-ui/core";

import ExpenseForm from "../components/ExpenseForm";
import ExpensesApi from "../api/ExpensesApi";
import Loader from "../components/Loader";
import Title from "../components/Title";
import TransactionsList from "../components/TransactionsList";
import { useHistory } from "react-router";
import { useState } from "react";

export default function NewExpensePage() {
	const [showTransactions, setShowTransactions] = useState(false);
	const [form, setForm] = useState({ source: "app", expense_date: new Date() });
	const [saving, setSaving] = useState(false);
	const router = useHistory();
	const toggleShowTransactions = () => {
		setShowTransactions((currentShowValue) => !currentShowValue);
	};

	const handleTransactionClick = (transaction) => {
		setForm((currentForm) => {
			let formCopy = { ...currentForm };
			if (transaction) {
				formCopy.expense_date = transaction.authorized_date
					? transaction.authorized_date
					: transaction.date;
				formCopy.amount = transaction.amount;
				formCopy.description = transaction.name;
				formCopy.source = "chase";
				formCopy.plaid_transaction_id = transaction.transaction_id;
				formCopy.channel =
					transaction.payment_channel === "in store" ? "cash" : transaction.payment_channel;

				return formCopy;
			} else {
				return { source: "app", expense_date: new Date() };
			}
		});
	};

	const handleSubmit = async () => {
		setSaving(true);
		try {
			await ExpensesApi.createOne(form);
			setSaving(false);
			router.push("/expenses");
		} catch (error) {
			console.log(error);
			setSaving(false);
		}
	};

	const isFormValid = () => {
		return form && "amount" in form && form.amount;
	};

	return (
		<Loader fullscreen loading={saving}>
			<div className="mb-4">
				<Title className="flex-between mb-4 sm:mb-10">
					New Expense
					<FormControlLabel
						control={<Switch checked={showTransactions} onChange={toggleShowTransactions} />}
						label="Show transactions"
						labelPlacement="start"
					/>
				</Title>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					<div className={showTransactions ? "col-span-1" : " col-span-2"}>
						<div className="md:sticky top-10">
							<ExpenseForm form={form} onFormChange={setForm}>
								<Button
									fullWidth
									variant="contained"
									disableElevation
									color="primary"
									onClick={handleSubmit}
									disabled={!isFormValid()}
								>
									Submit
								</Button>
							</ExpenseForm>
						</div>
					</div>
					<div className={showTransactions ? "block" : "hidden"}>
						<TransactionsList onTransactionClick={handleTransactionClick} />
					</div>
				</div>
			</div>
		</Loader>
	);
}
