import EventForm from "../components/EventForm";
import EventsApi from "../api/EventsApi";
import FormNav from "../components/FormNav";
import Loader from "../components/Loader";
import NewEventReview from "../components/NewEventReview";
import Title from "../components/Title";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function NewEventPage() {
	const router = useHistory();
	const [formStep, setFormStep] = useState(0);
	const [form, setForm] = useState({ workers: [] });
	const [submitting, setSubmitting] = useState(false);

	const handleFormFieldChange = (field, value) => {
		setForm((currentForm) => ({ ...currentForm, [field]: value }));
	};

	let formContent = null;
	switch (formStep) {
		case 0:
			formContent = (
				<EventForm form={form} onFieldChange={handleFormFieldChange} onFormChange={setForm} />
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
			handleSubmit();
		} else {
			setFormStep((currentStep) => currentStep + 1);
		}
	};

	const handleSubmit = async () => {
		setSubmitting(true);
		try {
			await EventsApi.createOne(form);
			router.push(`/events`);
		} catch (error) {
			console.log(error);
			setSubmitting(false);
		} finally {
		}
	};

	return (
		<div>
			<Title>New Event</Title>
			<Loader fullscreen loading={submitting}>
				{formContent}
				<FormNav formStep={formStep} onBackPress={handleBackPress} onNextPress={handleNextPress} />
			</Loader>
		</div>
	);
}
