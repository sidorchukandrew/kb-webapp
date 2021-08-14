import Alert from "../components/Alert";
import AuthApi from "../api/AuthApi";
import { Button } from "@material-ui/core";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [loggingIn, setLoggingIn] = useState(false);
	const [error, setError] = useState();
	const router = useHistory();

	const handleLogin = async () => {
		setLoggingIn(true);

		try {
			await AuthApi.login(name, password);
			localStorage.setItem("name", name);
			localStorage.setItem("password", password);

			router.push("/");
		} catch (error) {
			setLoggingIn(false);
			setError("Name or password is incorrect");
			console.log(error);
		}
	};

	return (
		<Loader fullscreen loading={loggingIn}>
			<div className="min-h-screen mx-auto max-w-lg flex-center flex-col px-2">
				<Title className="mb-4">Login</Title>

				<FormField label="Name" value={name} onChange={setName} />

				<FormField label="Password" type="password" value={password} onChange={setPassword} />

				<Button variant="contained" fullWidth color="primary" onClick={handleLogin}>
					Login
				</Button>

				{error && <Alert className="mt-6">{error}</Alert>}
			</div>
		</Loader>
	);
}
