import { API_URL } from "../utils/constants";
import axios from "axios";

const EVENTS_URL = `${API_URL}/events`;
export default class EventsApi {
	static createOne(event) {
		return axios.post(EVENTS_URL, event);
	}

	static getAll() {
		return axios.get(EVENTS_URL);
	}

	static getOne(id) {
		return axios.get(`${EVENTS_URL}/${id}`);
	}

	static updateOne(id, updates) {
		return axios.put(`${EVENTS_URL}/${id}`, updates);
	}

	static deleteOne(id) {
		return axios.delete(`${EVENTS_URL}/${id}`);
	}
}
