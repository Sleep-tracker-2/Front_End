import axios from "axios";

export const axiosWithAuth = () => {
	const token = localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: `${token}`
		},
		baseURL: "https://sleeptracker2.herokuapp.com/api/"
	});
};
