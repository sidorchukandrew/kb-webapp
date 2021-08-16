import { OWNERS, WORKERS } from "../utils/constants";
import { hasDeliveryFee, hasEventCost, hasTax } from "../utils/financial";

import FormField from "./FormField";
import FormSelect from "./FormSelect";
import HideableField from "./HideableField";
import { useState } from "react";

export default function EventForm({ form, onFieldChange, onFormChange, onFieldDeleted }) {
	const [hiddenFields, setHiddenFields] = useState(() => {
		return { delivery: !hasDeliveryFee(form), event_cost: !hasEventCost(form), tax: !hasTax(form) };
	});

	const handleToggleHiddenField = (field) => {
		const newHiddenValue = !hiddenFields[field];

		if (newHiddenValue) {
			let keys = Object.keys(form);
			let formCopy = JSON.parse(JSON.stringify(form));

			keys.forEach((key) => {
				if (key.indexOf(field) > -1) {
					delete formCopy[key];
					if (onFieldDeleted) {
						onFieldDeleted(key);
					}
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
				value={form.workers || form.users}
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
				icon="$"
			/>
			<HideableField
				label="Tax"
				hidden={hiddenFields.tax}
				onToggle={() => handleToggleHiddenField("tax")}
			>
				<div className="grid sm:flex sm:items-center sm:justify-between gap-2 sm:gap-6">
					<FormField
						label="Flat fee"
						type="number"
						onChange={(e) => onFieldChange("tax_flat_fee", e)}
						value={form.tax_flat_fee ? form.tax_flat_fee : ""}
						icon="$"
						className="mb-0"
					/>
					{/* <div className="flex-center my-3 sm:my-0">OR</div>
					<FormField
						label="Percentage of total"
						type="number"
						onChange={(e) => onFieldChange("tax_percentage", e)}
						value={form.tax_percentage ? form.tax_percentage : ""}
						icon="%"
						className="mb-0"
					/> */}
				</div>
			</HideableField>
			<HideableField
				label="Event Cost"
				hidden={hiddenFields.event_cost}
				onToggle={() => handleToggleHiddenField("event_cost")}
			>
				<div className="grid sm:flex sm:items-center sm:justify-between gap-2 sm:gap-6">
					<FormField
						label="Flat fee"
						type="number"
						onChange={(e) => onFieldChange("event_cost_flat_fee", e)}
						value={form.event_cost_flat_fee ? form.event_cost_flat_fee : ""}
						icon="$"
						className="mb-0"
					/>
					<div className="flex-center my-3 sm:my-0">OR</div>
					<FormField
						label="Percentage of total"
						type="number"
						onChange={(e) => onFieldChange("event_cost_percentage", e)}
						value={form.event_cost_percentage ? form.event_cost_percentage : ""}
						icon="%"
						className="mb-0"
					/>
				</div>
			</HideableField>

			<FormField
				label="Date"
				type="date"
				onChange={(e) => onFieldChange("event_date", e)}
				value={form.event_date ? form.event_date : new Date()}
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
					icon="$"
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
