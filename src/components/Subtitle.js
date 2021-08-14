export default function Subtitle({ children, className }) {
	return <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>;
}
