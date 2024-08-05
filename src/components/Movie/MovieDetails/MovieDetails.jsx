import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function AddMovie({ data }) {

    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    return (
        <>

            <h4 className='fw-bold text-underline text-primary' role='button' onClick={handleShow}><u>Title: {data.title}</u></h4>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Title: {data.title}</h1>
                    <p>Director: {data.director}</p>
                    <p>Genre: {data.genre}</p>
                    <p>Year: {data.year}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}