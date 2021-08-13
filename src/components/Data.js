import Label from "./Label";

export default function Data({ label, data }) {
	return (
		<div className="sm:flex mb-4 gap-3">
			{label && <Label>{label}</Label>}
			{data && <div>{data}</div>}
		</div>
	);
}
