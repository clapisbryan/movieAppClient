import React, { useEffect, useState } from 'react'
import { userDetails } from '../../services/userApiService'
import { Modal } from 'react-bootstrap'

const Profile = () => {

    const [result, setResult] = useState([])

    useEffect(() => {
        retriveUserDetails();
    }, [])

    const retriveUserDetails = async () => {

        const response = await userDetails();
        if (response) {
            setResult(response.user);
        }
        console.log("retriveUserDetails", response.user);

    }

    console.log("result", result);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <a className="nav-link" onClick={handleShow}>Profile</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Email: {result?.email}</p>
                    <p>Status: {result?.isAdmin ? "Admin" : "User"}</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile
