import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Vote() {

    const [ideas, setIdeas] = useState([]);
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        axios
            .post(`http://localhost:8081/ideas?token=${token}`)
            .then((response) => setIdeas(response.data))
            .catch((error) => console.error('Error fetching ideas:', error));
    }, [token]);


    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className='main-form'>
                <div>
                    <h1>Posted Ideas</h1>
                    {ideas.map((idea) => (
                        <div key={idea.id}>
                            <h2>{idea.idea_title}</h2>
                            <p>{idea.idea_summary}</p>
                            <p>{idea.idea_description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Vote;