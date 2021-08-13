export default function Title({ children, className }) {
	return <h2 className={`text-2xl font-bold my-4  ${className}`}>{children}</h2>;
}
