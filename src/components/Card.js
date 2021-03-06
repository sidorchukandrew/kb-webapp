import { CardContent, Card as MuiCard } from "@material-ui/core";

export default function Card({ children, className, title, onClick }) {
	return (
		<div className={className}>
			<MuiCard variant="outlined" onClick={onClick}>
				<CardContent>
					{title && <h2 className="font-semibold text-2xl mb-4">{title}</h2>}
					{children}
				</CardContent>
			</MuiCard>
		</div>
	);
}
