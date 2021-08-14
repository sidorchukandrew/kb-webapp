import { API_URL } from "../utils/constants";
import axios from "axios";
import { constructAuthHeader } from "../utils/auth";

export default class DashboardApi {
	static get() {
		return axios.get(API_URL + "/dashboard", { headers: constructAuthHeader() });
	}
}
