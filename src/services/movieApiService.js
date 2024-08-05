import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMovies = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/movies/getMovies`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const addMovie = async (payload) => {
	try {
		const { data } = await axios.post(
			`${API_URL}/movies/addMovie`,
			{
				title: payload.title,
				director: payload.director,
				year: payload.year,
				description: payload.description,
				genre: payload.genre
			},
			{
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const updateMovie = async (payload) => {
	try {
		const { data } = await axios.patch(
			`${API_URL}/movies/updateMovie/${payload.id}`,
			{
				title: payload.title,
				director: payload.director,
				year: payload.year,
				description: payload.description,
				genre: payload.genre
			},
			{
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteMovie = async (id) => {
	try {
		const { data } = await axios.delete(
			`${API_URL}/movies/deleteMovie/${id}`,
			{
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addComment = async (movieId, comment) => {
	try {
		const { data } = await axios.patch(
			`${API_URL}/movies/addComment/${movieId}`, {
			comment
		},
			{
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};


export const getComments = async (movieId) => {
	try {
		const { data } = await axios.get(`${API_URL}/movies/getComments/${movieId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});
		return data;
	} catch (error) {
		console.log(error);
	}
}
