import { InputAdornment, makeStyles } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DayJsUtils from "@date-io/dayjs";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
	root: {
		background: "white",
	},
});

export default function FormField({ label, type, onChange, value, icon, className }) {
	const classes = useStyles();

	if (type === "date") {
		return (
			<div className="mb-4">
				<MuiPickersUtilsProvider utils={DayJsUtils}>
					<KeyboardDatePicker
						variant="dialog"
						inputVariant="outlined"
						fullWidth
						onChange={(e) => onChange(new Date(e))}
						value={value}
						clearable
					/>
				</MuiPickersUtilsProvider>
			</div>
		);
	} else {
		return (
			<div className={`w-full ${className}`}>
				<TextField
					className={classes.root}
					variant="outlined"
					color="secondary"
					label={label}
					fullWidth
					type={type}
					onChange={(e) => onChange(e.target.value)}
					value={value}
					InputProps={
						icon && { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }
					}
					multiline={type === "text"}
				/>
			</div>
		);
	}
}

FormField.defaultProps = {
	type: "text",
	className: "mb-4",
};
