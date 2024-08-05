import React, { useEffect, useState } from 'react'
import { getComments } from '../../../services/movieApiService'

const GetComment = ({ movieId }) => {

    const [result, setResult] = useState('');

    useEffect(() => {
        retrieveComment();
    }, [])

    const retrieveComment = async () => {
        try {
            const response = await getComments(movieId);
            if (response) {
                setResult(response.comments || [])
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            {result?.length > 0 ?
                result.map(comment => {
                    return (
                        <p key={comment._id}>{comment.comment}</p>
                    )
                })
                :
                <p>No Comment yet</p>
            }
        </div>
    )
}

export default GetComment
