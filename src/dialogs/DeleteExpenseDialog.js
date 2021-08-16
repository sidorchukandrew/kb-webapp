import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import ExpensesApi from "../api/ExpensesApi";

export default function DeleteExpenseDialog({ open, onClose }) {
	const id = useParams().id;
	const router = useHistory();

	const handleDelete = async () => {
		try {
			await ExpensesApi.deleteOne(id);
			router.push("/expenses");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
			<DialogTitle>Delete expense?</DialogTitle>
			<DialogContent>
				Are you sure you'd like to delete this expense? Doing so is irreversible.
			</DialogContent>
			<DialogActions>
				<Button variant="contained" disableElevation color="primary" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="contained" disableElevation onClick={handleDelete}>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}
