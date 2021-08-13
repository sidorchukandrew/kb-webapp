import FormNav from "../components/FormNav";
import NewEventForm from "../components/NewEventForm";
import NewEventReview from "../components/NewEventReview";
import Title from "../components/Title";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function NewEventPage() {
	const router = useHistory();
	const [formStep, setFormStep] = useState(0);
	const [form, setForm] = useState({ workers: [] });

	const handleFormFieldChange = (field, value) => {
		setForm((currentForm) => ({ ...currentForm, [field]: value }));
	};

	let formContent = null;
	switch (formStep) {
		case 0:
			formContent = (
				<NewEventForm form={form} onFieldChange={handleFormFieldChange} onFormChange={setForm} />
			);
			break;
		case 1:
			formContent = <NewEventReview form={form} />;
			break;
		default:
			formContent = "Out of bounds";
			break;
	}

	const handleBackPress = () => {
		if (formStep === 0) {
			router.push("/events");
		} else {
			setFormStep((currentStep) => currentStep - 1);
		}
	};

	const handleNextPress = () => {
		if (formStep === 1) {
			console.log("Submitting");
		} else {
			setFormStep((currentStep) => currentStep + 1);
		}
	};

	return (
		<div>
			<Title>New Event</Title>
			{formContent}
			<FormNav formStep={formStep} onBackPress={handleBackPress} onNextPress={handleNextPress} />
		</div>
	);
}
