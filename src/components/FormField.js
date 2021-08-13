import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DayJsUtils from "@date-io/dayjs";
import { InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export default function FormField({ label, type, onChange, value, icon }) {
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
					/>
				</MuiPickersUtilsProvider>
			</div>
		);
	} else {
		return (
			<div className="mb-4 w-full">
				<TextField
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
				/>
			</div>
		);
	}
}

FormField.defaultProps = {
	type: "text",
};
