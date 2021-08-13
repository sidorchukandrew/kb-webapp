import { Button } from "@material-ui/core";
import { FORM_STEP_BUTTONS } from "../utils/constants";

export default function FormNav({ formStep, onBackPress, onNextPress }) {
	return (
		<div className="flex-between mt-8 mb-4">
			<Button variant="contained" disableElevation onClick={onBackPress}>
				{FORM_STEP_BUTTONS[formStep].back}
			</Button>
			<Button variant="contained" color="primary" disableElevation onClick={onNextPress}>
				{FORM_STEP_BUTTONS[formStep].next}
			</Button>
		</div>
	);
}
