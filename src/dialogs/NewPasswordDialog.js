import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

import AuthApi from "../api/AuthApi";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { useState } from "react";

export default function NewPasswordDialog({ open, onClose }) {
	const [password, setPassword] = useState("");
	const [updating, setUpdating] = useState(false);

	const handleUpdate = async () => {
		setUpdating(true);
		try {
			await AuthApi.updatePassword(password);
			localStorage.setItem("password", password);
			onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setUpdating(false);
		}
	};

	return (
		<Loader fullscreen loading={updating}>
			<Dialog open={open} fullWidth maxWidth="xs">
				<DialogTitle>New Password</DialogTitle>
				<DialogContent>
					<div className="mb-4">Set up a new password</div>
					<FormField
						type="password"
						label="Password"
						onChange={setPassword}
						value={password}
						className="mb-2"
					/>
				</DialogContent>
				<DialogActions>
					<div className="px-4 pb-2 w-full">
						<Button
							fullWidth
							variant="contained"
							color="primary"
							disableElevation
							disabled={password === ""}
							onClick={handleUpdate}
						>
							Confirm
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</Loader>
	);
}
