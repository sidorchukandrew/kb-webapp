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

	static getOne(id) {
		return axios.get(`${EXPENSES_URL}/${id}`, { headers: constructAuthHeader() });
	}

	static deleteOne(id) {
		return axios.delete(`${EXPENSES_URL}/${id}`, { headers: constructAuthHeader() });
	}

	static updateOne(id, updates) {
		return axios.put(`${EXPENSES_URL}/${id}`, updates, { headers: constructAuthHeader() });
	}
}
