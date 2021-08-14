import { useEffect, useState } from "react";

import Dashboard from "../components/Dashboard";
import DashboardApi from "../api/DashboardApi";
import Loader from "../components/Loader";
import Title from "../components/Title";

export default function HomePage() {
	const [dashboardData, setDashboardData] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchDashboard() {
			try {
				setLoading(true);
				let { data } = await DashboardApi.get();
				setDashboardData(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchDashboard();
	}, []);
	return (
		<div>
			<Title>Dashboard</Title>
			<Loader loading={loading && !dashboardData}>
				<Dashboard data={dashboardData} />
			</Loader>
		</div>
	);
}
