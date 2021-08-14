export default function SelectableCard({ selected, children, onClick, className }) {
	return (
		<div
			className={
				`p-3 border-2 rounded-md w-full cursor-pointer focus:outline-none outline-none ` +
				` hover:border-red-500 transition-colors ` +
				` ${selected ? "border-red-500" : ""} ` +
				` ${className}`
			}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
