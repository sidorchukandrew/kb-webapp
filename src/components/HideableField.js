import { FormControlLabel, Switch } from "@material-ui/core";

export default function HideableField({ hidden, label, onToggle, children }) {
	return (
		<div className="mb-4">
			<FormControlLabel
				label={label}
				control={<Switch onChange={onToggle} checked={!hidden} />}
				labelPlacement="start"
			/>

			{!hidden && <div className="mt-4">{children}</div>}
		</div>
	);
}
