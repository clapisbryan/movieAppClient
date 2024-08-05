import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (email, password) => {
	try {
		const { data } = await axios.post(`${API_URL}/users/register`, {
			email,
			password
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}


export const login = async (email, password) => {
	try {
		const { data } = await axios.post(`${API_URL}/users/login`, {
			email,
			password
		})

		return data;
	} catch (error) {
		console.log(error);

	}
}

export const userDetails = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/users/details`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})

		return data;
	} catch (error) {
		console.log(error);

	}
}
