export default function StackedData({ data, label, className }) {
	return (
		<div className={`leading-snug ${className}`}>
			<div className="font-semibold">{label}</div>
			<div>{data}</div>
		</div>
	);
}
