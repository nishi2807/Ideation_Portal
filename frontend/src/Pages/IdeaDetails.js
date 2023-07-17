import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import './ideaDetail.css';

function IdeaDetails() {
    const navigate = useNavigate();
    const { ideaId } = useParams();
    const [ideaContent, setIdeaContent] = useState(null);

    useEffect(() => {
        const fetchIdeaContent = async () => {
            try {
                const response = await axios.post(`http://localhost:8081/ideas/ideaContent?idea_id=${ideaId}`);
                const ideaContent = response.data;
                setIdeaContent(ideaContent.ideaContent);
            } catch (error) {
                console.error('Error fetching idea content:', error);
            }
        };

        fetchIdeaContent();
    }, [ideaId]);

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };

    if (!ideaContent) {
        return <div>Loading...</div>;
    }

    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className='main-form'>
                <h1 className='form-heading'>Idea Details</h1>
                <h2 className='prob-stat'>Idea Title: {ideaContent.idea_title}</h2>
                <div className='idea-det'>
                    <div>
                        <h3 className='summ-title'>Idea Summary</h3>
                        <p className='idea-summ'>{ideaContent.idea_summary}</p>
                    </div>
                    <div className='des'>
                        <h3 className='des-title'>Idea Description</h3>
                        <p className='idea-des'>{ideaContent.idea_description}</p>
                    </div>
                </div>
                <button className="idea-post-btn" onClick={goBack}>Go Back</button>
            </div>
        </div>
    );
}

export default IdeaDetails;
