import { CircularProgress } from "@material-ui/core";

export default function Loader({ children, loading, fullscreen }) {
	if (loading && !fullscreen) {
		return (
			<div className="flex-center">
				<CircularProgress />
			</div>
		);
	} else if (loading && fullscreen) {
		return (
			<>
				<div className="fixed left-0 top-0 h-full w-full flex-center z-1000 bg-gray-100 bg-opacity-70">
					<CircularProgress size={70} />
				</div>
				{children}
			</>
		);
	} else {
		return children;
	}
}
