import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import EventsIndexPage from "./pages/EventsIndexPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import NewEventPage from "./pages/NewEventPage";

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
						<Layout>
							<Route path="/events" exact>
								<EventsIndexPage />
							</Route>
							<Route path="/events/new" exact>
								<NewEventPage />
							</Route>
							<Route path="/" exact>
								<HomePage />
							</Route>
						</Layout>
					</Switch>
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
