import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useStyles } from "./Navbar";

export default function NavbarLink({ children, to }) {
	const [isActive, setIsActive] = useState(false);
	const classes = useStyles();

	return (
		<NavLink
			to={to}
			isActive={(match) => {
				setIsActive(Boolean(match?.isExact));
			}}
			style={{ textDecoration: "none" }}
		>
			<Button variant="outlined" className={isActive ? classes.activeColors : classes.colors}>
				{children}
			</Button>
		</NavLink>
	);
}
