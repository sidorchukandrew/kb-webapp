import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import LoginPage from "./pages/LoginPage";
import SecuredRoutes from "./components/SecuredRoutes";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ed1f24",
		},
		secondary: {
			main: "#000",
		},
	},
});

function App() {
	return (
		<div>
			<Router>
				<ThemeProvider theme={theme}>
					<Switch>
						<Route path="/login" exact>
							<LoginPage />
						</Route>
						<SecuredRoutes />
					</Switch>
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
