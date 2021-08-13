import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		background: "white",
	},
});
export default function FormSelect({ label, onChange, options, value, multi }) {
	const classes = useStyles();

	return (
		<div className="mb-4">
			<FormControl variant="outlined" color="secondary" fullWidth className={classes.root}>
				<InputLabel id="select-label">{label}</InputLabel>
				<Select
					multiple={multi}
					value={value}
					label={label}
					onChange={(e) => onChange(e.target.value)}
					renderValue={(selected) => (multi ? selected.join(", ") : selected)}
				>
					{options?.map((option, index) => (
						<MenuItem key={index} value={option}>
							<Checkbox checked={multi ? value.includes(option) : value === option} />
							<ListItemText primary={option} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
