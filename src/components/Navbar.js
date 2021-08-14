import { Button, makeStyles } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import NavbarLink from "./NavbarLink";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";

export const useStyles = makeStyles(() => ({
	colors: {
		color: "#d0d0d0",
	},
	activeColors: {
		color: "#ffffff",
	},
}));

export default function Navbar() {
	const classes = useStyles();
	const router = useHistory();

	const handleLogout = () => {
		localStorage.removeItem("name");
		localStorage.removeItem("password");

		router.push("/login");
	};

	return (
		<AppBar color="secondary" position="static">
			<Toolbar>
				<div className="flex-between w-full">
					<div>
						<NavbarLink to="/">Home</NavbarLink>
						<NavbarLink to="/events">Events</NavbarLink>
					</div>
					<Button variant="outlined" className={classes.colors} onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
}
