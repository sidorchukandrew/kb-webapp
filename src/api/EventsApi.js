import { API_URL } from "../utils/constants";
import axios from "axios";
import { constructAuthHeader } from "../utils/auth";

const EVENTS_URL = `${API_URL}/events`;
export default class EventsApi {
	static createOne(event) {
		return axios.post(EVENTS_URL, event, { headers: constructAuthHeader() });
	}

	static getAll() {
		return axios.get(EVENTS_URL, { headers: constructAuthHeader() });
	}

	static getOne(id) {
		return axios.get(`${EVENTS_URL}/${id}`, { headers: constructAuthHeader() });
	}

	static updateOne(id, updates) {
		return axios.put(`${EVENTS_URL}/${id}`, updates, { headers: constructAuthHeader() });
	}

	static deleteOne(id) {
		return axios.delete(`${EVENTS_URL}/${id}`, { headers: constructAuthHeader() });
	}
}
