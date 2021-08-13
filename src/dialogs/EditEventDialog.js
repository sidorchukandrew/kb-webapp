import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useEffect, useState } from "react";

import EventForm from "../components/EventForm";
import EventsApi from "../api/EventsApi";
import Loader from "../components/Loader";

export default function EditEventDialog({ event, open, onClose, onSaved }) {
	const [form, setForm] = useState(event);
	const [edits, setEdits] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setForm(event);
	}, [event, open]);

	const handleFieldChange = (field, value) => {
		setForm((currentForm) => ({ ...currentForm, [field]: value }));
		setEdits((currentEdits) => ({ ...currentEdits, [field]: value }));
	};

	const handleSave = async () => {
		setSaving(true);
		try {
			let { data } = await EventsApi.updateOne(event.id, edits);
			data.users = data.users?.map((user) => user.username);
			data.workers = data.users;
			setSaving(false);
			onSaved(data);
			handleClose();
		} catch (error) {
			setSaving(false);
			console.log(error);
		}
	};

	const handleDeleteEdit = (fieldToDelete) => {
		setEdits((currentEdits) => ({ ...currentEdits, [fieldToDelete]: null }));
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
						<EventForm
							form={form}
							onFieldChange={handleFieldChange}
							onFormChange={setForm}
							onFieldDeleted={handleDeleteEdit}
						/>
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
