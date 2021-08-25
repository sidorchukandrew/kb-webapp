import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { IconButton } from "@material-ui/core";

export default function CalendarHeader({ title, onPrevious, onNext }) {
	return (
		<div>
			<div className="flex-between">
				<h2 className="font-semibold text-2xl mb-4">{title}</h2>
				<div>
					<IconButton size="small" onClick={onPrevious}>
						<ArrowLeftIcon />
					</IconButton>
					<IconButton size="small" onClick={onNext}>
						<ArrowRightIcon />
					</IconButton>
				</div>
			</div>
			<div className="grid grid-cols-7 text-gray-600 mb-2">
				<div className="col-span-1">Su</div>
				<div className="col-span-1">Mo</div>
				<div className="col-span-1">Tu</div>
				<div className="col-span-1">We</div>
				<div className="col-span-1">Th</div>
				<div className="col-span-1">Fr</div>
				<div className="col-span-1">Sa</div>
			</div>
		</div>
	);
}
