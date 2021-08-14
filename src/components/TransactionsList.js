import { useEffect, useState } from "react";

import Loader from "./Loader";
import Subtitle from "./Subtitle";
import { TextField } from "@material-ui/core";
import Transaction from "./Transaction";
import TransactionsApi from "../api/TransactionsApi";

export default function TransactionsList({ onTransactionClick }) {
	const [query, setQuery] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [selectedTransaction, setSelectedTransaction] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchTransactions() {
			try {
				setLoading(true);
				let { data } = await TransactionsApi.getAll();
				setTransactions(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchTransactions();
	}, []);

	useEffect(() => {
		if (query === "") {
			setFilteredTransactions(transactions);
		} else {
			let filtered = transactions.filter((transaction) => {
				let lowerCaseName = transaction.name.toLowerCase();
				return lowerCaseName.includes(query);
			});

			setFilteredTransactions(filtered);
		}
	}, [transactions, query]);

	const handleTransactionClick = (transaction) => {
		if (transaction === selectedTransaction) {
			setSelectedTransaction(null);
			onTransactionClick(null);
		} else {
			setSelectedTransaction(transaction);
			onTransactionClick(transaction);
		}
	};

	return (
		<>
			<Subtitle className="mb-1">
				Recent transactions {transactions.length > 0 && `(${transactions.length})`}
			</Subtitle>
			<div className="mb-4">
				<TextField
					color="secondary"
					value={query}
					fullWidth
					label="Search"
					onChange={(e) => setQuery(e.target.value.toLowerCase())}
				/>
			</div>
			<Loader loading={loading} className="mt-10">
				<div className="flex flex-col gap-y-2">
					{filteredTransactions.map((transaction, index) => (
						<Transaction
							key={index}
							transaction={transaction}
							onClick={() => handleTransactionClick(transaction)}
							selected={selectedTransaction === transaction}
						/>
					))}
				</div>
			</Loader>
		</>
	);
}
