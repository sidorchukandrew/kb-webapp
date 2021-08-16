import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useEffect, useState } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpensesApi from "../api/ExpensesApi";
import Loader from "../components/Loader";

export default function EditExpenseDialog({ expense, open, onClose, onSaved }) {
	const [form, setForm] = useState(expense);
	const [edits, setEdits] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setForm(expense);
	}, [expense, open]);

	const handleFormChange = (newForm) => {
		let editsCopy = { ...edits };
		if (newForm.expense_date !== form.expense_date) {
			editsCopy.expense_date = newForm.expense_date;
		}

		if (newForm.amount !== form.amount) {
			editsCopy.amount = newForm.amount;
		}

		if (newForm.description !== form.description) {
			editsCopy.description = newForm.description;
		}

		if (newForm.channel !== form.channel) {
			editsCopy.channel = form.channel;
		}

		setForm(newForm);
		setEdits(editsCopy);
	};

	const handleSave = async () => {
		setSaving(true);
		try {
			let { data } = await ExpensesApi.updateOne(expense.id, edits);
			setSaving(false);
			onSaved(data);
			handleClose();
		} catch (error) {
			setSaving(false);
			console.log(error);
		}
	};

	const handleClose = () => {
		setEdits({});
		onClose();
	};

	return (
		<Loader fullscreen loading={saving}>
			<Dialog open={open} onClose={handleClose} scroll="paper" fullWidth maxWidth="sm">
				<DialogTitle>Edit</DialogTitle>
				<DialogContent dividers>
					<div className="my-2">
						<ExpenseForm form={form} onFormChange={handleFormChange} />
					</div>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" disableElevation onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="contained" color="primary" disableElevation onClick={handleSave}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Loader>
	);
}
