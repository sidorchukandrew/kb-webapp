import AppBar from "@material-ui/core/AppBar";
import NavbarLink from "./NavbarLink";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
	colors: {
		color: "#d6d6d6",
	},
	activeColors: {
		color: "#ffffff",
	},
}));

export default function Navbar() {
	return (
		<AppBar color="secondary" position="static">
			<Toolbar>
				<NavbarLink to="/">Home</NavbarLink>
				<NavbarLink to="/events">Events</NavbarLink>
			</Toolbar>
		</AppBar>
	);
}
