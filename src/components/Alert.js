export default function Alert({ children, className }) {
	return (
		<div className={`rounded-md p-3 text-red-700 bg-red-200 font-semibold w-full ${className}`}>
			{children}
		</div>
	);
}
