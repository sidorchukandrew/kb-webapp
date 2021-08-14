import { API_URL } from "../utils/constants";
import axios from "axios";
import { constructAuthHeader } from "../utils/auth";

const EXPENSES_URL = API_URL + "/expenses";
export default class ExpensesApi {
	static createOne(expense) {
		return axios.post(EXPENSES_URL, expense, { headers: constructAuthHeader() });
	}

	static getAll() {
		return axios.get(EXPENSES_URL, { headers: constructAuthHeader() });
	}
}
