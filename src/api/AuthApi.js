import { API_URL } from "../utils/constants";
import axios from "axios";
import { constructAuthHeader } from "../utils/auth";

export default class AuthApi {
	static login(name, password) {
		return axios.post(API_URL + "/login", { name, password });
	}

	static checkCredentials(name, password) {
		return axios.post(API_URL + "/check_credentials", { name, password });
	}

	static updatePassword(password) {
		return axios.put(API_URL + "/password", { password }, { headers: constructAuthHeader() });
	}
}
