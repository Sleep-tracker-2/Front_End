import axios from "axios";

export const axiosWithAuth = () => {
	const token = localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: token,
			withCredentials: true
		},
		baseURL: "https://sleeptracker2.herokuapp.com/api/"
	});
};
