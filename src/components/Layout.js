import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<Container maxWidth="md">
				<main>{children}</main>
			</Container>
		</>
	);
}
