import { OWNERS, WORKERS } from "../utils/constants";
import { hasDeliveryFee, hasEventCost } from "../utils/financial";

import FormField from "./FormField";
import FormSelect from "./FormSelect";
import HideableField from "./HideableField";
import { useState } from "react";

export default function NewEventForm({ form, onFieldChange, onFormChange }) {
	const [hiddenFields, setHiddenFields] = useState(() => {
		return { delivery: !hasDeliveryFee(form), event_cost: !hasEventCost(form) };
	});

	const handleToggleHiddenField = (field) => {
		const newHiddenValue = !hiddenFields[field];

		if (newHiddenValue) {
			let keys = Object.keys(form);
			let formCopy = JSON.parse(JSON.stringify(form));

			keys.forEach((key) => {
				if (key.indexOf(field) > -1) {
					delete formCopy[key];
				}
			});

			onFormChange(formCopy);
		}

		setHiddenFields((currentFields) => ({ ...currentFields, [field]: !currentFields[field] }));
	};

	return (
		<div>
			<FormSelect
				label="Workers"
				options={WORKERS}
				value={form.workers}
				onChange={(e) => onFieldChange("workers", e)}
				multi
			/>
			<FormField
				label="Description"
				onChange={(e) => onFieldChange("description", e)}
				value={form.description ? form.description : ""}
			/>
			<FormField
				label="Revenue"
				type="number"
				onChange={(e) => onFieldChange("revenue", e)}
				value={form.revenue ? form.revenue : ""}
			/>
			<HideableField
				label="Event Cost"
				hidden={hiddenFields.event_cost}
				onToggle={() => handleToggleHiddenField("event_cost")}
			>
				<div className="flex-between gap-6">
					<FormField
						label="Flat fee"
						type="number"
						onChange={(e) => onFieldChange("event_cost_flat_fee", e)}
						value={form.event_cost_flat_fee ? form.event_cost_flat_fee : ""}
						icon="$"
					/>
					<div>OR</div>
					<FormField
						label="Percentage of total"
						type="number"
						onChange={(e) => onFieldChange("event_cost_percentage", e)}
						value={form.event_cost_percentage ? form.event_cost_percentage : ""}
						icon="%"
					/>
				</div>
			</HideableField>

			<FormField
				label="Date"
				type="date"
				onChange={(e) => onFieldChange("date", e)}
				value={form.date ? form.date : new Date()}
			/>

			<HideableField
				hidden={hiddenFields.delivery}
				label="Delivery"
				onToggle={() => handleToggleHiddenField("delivery")}
			>
				<FormField
					label="Delivery Fee"
					value={form.delivery_fee ? form.delivery_fee : ""}
					onChange={(e) => onFieldChange("delivery_fee", e)}
					type="number"
				/>

				<FormSelect
					label="Delivery Driver"
					options={OWNERS}
					value={form.delivery_driver ? form.delivery_driver : ""}
					onChange={(e) => onFieldChange("delivery_driver", e)}
				/>
			</HideableField>
		</div>
	);
}
