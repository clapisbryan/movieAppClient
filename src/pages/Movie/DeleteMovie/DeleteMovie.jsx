import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteMovie } from '../../../services/movieApiService';


export default function DeleteMovie({ fetchData, id }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteMovie = async (e) => {
        e.preventDefault();

        try {
            const response = await deleteMovie(id);

            if (response) {
                setShow(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Movie',
                    text: 'Delete Movie Successfully',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchData();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Delete movie failed',
                    text: 'Please try again'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Movie failed',
                text: 'Please try again.'
            });
        }
    };


    return (
        <>

            <Button variant="danger" className='mx-1' size='sm' onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this movie?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" type="submit" onClick={(e) => handleDeleteMovie(e)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}