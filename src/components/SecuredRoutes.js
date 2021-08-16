import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import AuthApi from "../api/AuthApi";
import { CircularProgress } from "@material-ui/core";
import EventDetailPage from "../pages/EventDetailPage";
import EventsIndexPage from "../pages/EventsIndexPage";
import ExpenseDetailPage from "../pages/ExpenseDetailPage";
import ExpensesIndexPage from "../pages/ExpensesIndexPage";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import NewEventPage from "../pages/NewEventPage";
import NewExpensePage from "../pages/NewExpensePage";
import NewPasswordDialog from "../dialogs/NewPasswordDialog";
import { isFirstLogin } from "../utils/auth";

export default function SecuredRoutes() {
	const router = useHistory();
	const [authenticating, setAuthenticating] = useState(true);
	const [showPasswordDialog, setShowPasswordDialog] = useState(false);

	useEffect(() => {
		async function attemptLogin() {
			try {
				let name = localStorage.getItem("name");
				let password = localStorage.getItem("password");
				let { data } = await AuthApi.checkCredentials(name, password);

				setShowPasswordDialog(isFirstLogin(data));
				setAuthenticating(false);
			} catch (error) {
				router.push("/login");
			}
		}

		attemptLogin();
	}, [router]);

	if (authenticating) {
		return (
			<div className="min-h-screen flex-center mx-auto">
				<CircularProgress size={80} />
			</div>
		);
	} else {
		return (
			<Layout>
				<Switch>
					<Route path="/events" exact>
						<EventsIndexPage />
					</Route>
					<Route path="/events/new" exact>
						<NewEventPage />
					</Route>
					<Route path="/events/:id" exact>
						<EventDetailPage />
					</Route>
					<Route path="/expenses" exact>
						<ExpensesIndexPage />
					</Route>
					<Route path="/expenses/new" exact>
						<NewExpensePage />
					</Route>
					<Route path="/expenses/:id" exact>
						<ExpenseDetailPage />
					</Route>
					<Route path="/" exact>
						<HomePage />
					</Route>
				</Switch>
				<NewPasswordDialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} />
			</Layout>
		);
	}
}
