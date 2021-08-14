import SelectableCard from "./SelectableCard";
import StackedData from "./StackedData";
import dayjs from "dayjs";
import { formatCurrency } from "../utils/financial";

export default function Transaction({ transaction, onClick, selected }) {
	const date = transaction.authorized_date ? transaction.authorized_date : transaction.date;
	let location = null;

	if (Object.keys(transaction.location).length > 0) {
		location = (
			<div>
				{transaction.location.city}, {transaction.location.region}
			</div>
		);
	}

	return (
		<SelectableCard onClick={onClick} selected={selected}>
			<div className="flex-between py-1">
				<div className="w-1/4 text-center pr-3 text-lg font-semibold">
					{formatCurrency(transaction.amount)} <br />
					<span className="rounded-md text-gray-600 font-semibold bg-gray-200 p-1 text-xs">
						{transaction.payment_channel}
					</span>
				</div>
				<div className="border-l flex flex-col justify-items-center items-start w-full pl-6 text-sm">
					{date && (
						<StackedData label="Date" data={dayjs(date).toDate().toDateString()} className="mb-3" />
					)}
					{transaction.name && (
						<StackedData label="Name" data={transaction.name} className="mb-3" />
					)}
					{location && <StackedData label="Location" data={location} />}
				</div>
			</div>
		</SelectableCard>
	);
}
