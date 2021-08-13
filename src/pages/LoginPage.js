import { Button } from "@material-ui/core";
import FormField from "../components/FormField";
import Title from "../components/Title";
import { useState } from "react";

export default function LoginPage() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		console.log("Logging in");
	};

	return (
		<div className="min-h-screen mx-auto max-w-lg flex-center flex-col">
			<Title className="mb-4">Login</Title>

			<FormField label="Name" value={name} onChange={setName} />

			<FormField label="Password" type="password" value={password} onChange={setPassword} />

			<Button variant="contained" fullWidth color="primary" onClick={handleLogin}>
				Login
			</Button>
		</div>
	);
}
