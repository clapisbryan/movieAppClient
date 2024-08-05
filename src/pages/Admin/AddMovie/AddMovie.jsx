import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addMovie } from '../../../services/movieApiService';


export default function AddMovie({ fetchData }) {
    const token = localStorage.getItem('token');

    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {

        if (title !== '' && director !== '' && year !== '' && description !== '' && genre !== '') {
            setIsActive(false);
        } else {
            setIsActive(true);
        }

    }, [title, director, year, description, genre])


    const handleAddMovie = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            director,
            year,
            description,
            genre
        };

        try {
            const response = await addMovie(payload);

            if (response) {
                setTitle("");
                setDirector("");
                setDescription("");
                setGenre("");
                setYear("");
                Swal.fire({
                    icon: 'success',
                    title: 'Add Movie',
                    text: 'Added Movie Successfully',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchData();
                        setShow(false);
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Add movie failed',
                    text: 'Please try again'
                });
            }
        } catch (error) {
            console.error("Error adding movie:", error);
            Swal.fire({
                icon: 'error',
                title: 'Movie failed',
                text: 'Please try again.'
            });
        }
    };


    return (
        <>
            {token &&
                <div className="text-end my-5">
                    <Button variant="primary" onClick={handleShow}>
                        Add Movie
                    </Button>
                </div>
            }
            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie name"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie director"
                                required
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie genre"
                                required
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter year"
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {isActive ?

                        <Button variant="danger" type="submit" disabled>
                            Add
                        </Button>
                        :
                        <Button variant="primary" type="submit" onClick={(e) => handleAddMovie(e)}>
                            Add
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}