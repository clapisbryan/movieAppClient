import React, { useEffect, useState } from 'react'
import { getMovies } from '../../services/movieApiService';
import { Col, Container, Row } from 'react-bootstrap';
import AddMovie from '../Admin/AddMovie/AddMovie';
import { Link } from 'react-router-dom';
import MovieDetails from '../../components/Movie/MovieDetails/MovieDetails';
import UpdateMovie from './UpdateMovie/UpdateMovie';
import DeleteMovie from './DeleteMovie/DeleteMovie';
import AddComment from './AddComment/AddComment';
import GetComment from './GetComment/GetComment';

const Movie = () => {

	const token = localStorage.getItem('token');

	const [result, setResult] = useState([]);
	useEffect(() => {
		retrieveMovies();
	}, [token])

	const retrieveMovies = async () => {
		const response = await getMovies();

		if (response) {
			setResult(response.movies || []);
		}

	}

	return (
		<div>
			<Container>
				<AddMovie fetchData={retrieveMovies} />
				<div className="text-center mb-3">
					<h1>Movies</h1>
				</div>
				<Row>
					{result.length > 0 &&
						result.map(movie => {
							return (
								<Col sm={12} md={6} lg={3} className='mb-3' key={movie._id}>
									<div className="card h-100">
										<div className="card-body">
											{token &&
												<div className="text-end mb-3">
													<UpdateMovie fetchData={retrieveMovies} data={movie} />
													<DeleteMovie fetchData={retrieveMovies} id={movie._id} />
												</div>
											}
											<MovieDetails data={movie} />
											<p className='text-capitalize'>Director: {movie.director}</p>
											<p>Genre: {movie.genre}</p>
											<p>Year: {movie.year}</p>
											<GetComment movieId={movie._id} />
											{token &&
												<AddComment fetchData={retrieveMovies} movieId={movie._id} />
											}
										</div>
									</div>
								</Col>
							)
						})
					}
				</Row>
			</Container>
		</div>
	)
}

export default Movie
