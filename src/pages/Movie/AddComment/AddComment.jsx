import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addComment } from '../../../services/movieApiService';

const AddComment = ({ movieId, fetchData }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        try {
            const response = await addComment(movieId, comment);
            console.log("handleAddComment", response);

            if (response) {
                setComment('');
                fetchData();
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

