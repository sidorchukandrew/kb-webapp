import { API_URL } from "../utils/constants";
import axios from "axios";
import { constructAuthHeader } from "../utils/auth";

const TRANSACTIONS_URL = API_URL + "/transactions";
export default class TransactionsApi {
	static getAll() {
		return axios.get(TRANSACTIONS_URL, { headers: constructAuthHeader() });
	}
}
