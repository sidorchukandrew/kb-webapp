import { CHANNEL_OPTIONS } from "../utils/constants";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

export default function ExpenseForm({ form, onFormChange, children }) {
	const handleFieldChange = (field, value) => {
		onFormChange({ ...form, [field]: value });
	};
	return (
		<div>
			<FormField
				label="Amount"
				type="number"
				icon="$"
				value={form.amount ? form.amount : ""}
				onChange={(e) => handleFieldChange("amount", e.target.value)}
			/>
			<FormField
				label="Description"
				value={form.description ? form.description : ""}
				onChange={(e) => handleFieldChange("description", e.target.value)}
				type="text"
			/>
			<FormField
				label="Date"
				type="date"
				value={form.expense_date}
				onChange={(e) => handleFieldChange("expense_date", e)}
			/>
			<FormSelect
				label="Channel"
				options={CHANNEL_OPTIONS}
				value={form.channel ? form.channel : ""}
				onChange={(e) => handleFieldChange("channel", e)}
			/>
			{children}
		</div>
	);
}
