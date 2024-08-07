import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addComment } from '../../../services/movieApiService';
import Swal from 'sweetalert2';

const AddComment = ({ fetchData, movieId }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        try {
            const response = await addComment(movieId, comment);

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add comment',
                    text: 'Add comment Successfully',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchData();
                        setComment('');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update movie failed',
                    text: 'Please try again'
                });
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <>
            <Form.Group className="form-floating mb-2">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={comment}
                    onChange={handleCommentChange}
                    style={{ height: '50px' }}
                />
                <Form.Label>Comments</Form.Label>
            </Form.Group>
            <div className="text-end">
                <Button variant='primary' size='sm' onClick={handleAddComment}>Send</Button>
            </div>
        </>
    )
}

export default AddComment

