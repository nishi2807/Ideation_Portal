import React from 'react';
import Navbar from '../Components/Navbar';
import './idea.css'
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Idea() {
    const [values, setValues] = useState({
        idea_title: '',
        idea_summary: '',
        idea_description: ''
    });

    const navigate = useNavigate('')

    const [camp_title, setCamp_title] = useState('');
    const [camp_id, setCamp_id] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const url = new URL(window.location.href);
        // const token = url.searchParams.get('token');
        setCamp_title(decodeURIComponent(url.searchParams.get('camp_title')))
        setCamp_id(url.searchParams.get('camp_id'))
        setToken(url.searchParams.get('token'));

        // Do something with the token
        console.log(token);
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!values.idea_title || !values.idea_summary || !values.idea_description) {
            alert('Please fill in all required fields.');
            return;
        }

        axios.post(`http://localhost:8081/ideas/${camp_id}/${token}`, {
            idea_title: values.idea_title,
            idea_summary: values.idea_summary,
            idea_description: values.idea_description
        })
            .then(res => {
                alert('Your Idea has been posted successfully!')
                navigate(`/all-ideas?token=${token}&camp_title=${camp_title}&camp_id=${camp_id}`)
                console.log(res.data.message);
            })
            .catch(error => {
                console.error('Error:', error.response.data);
                alert('campaign has already been closed !')
                // Handle the error
            });

    }

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='home-page'>
            <Navbar></Navbar>

            <div className='main-form'>
                <h1 className='form-heading'>Post Your Ideas for {camp_id}</h1>
                <h2 className='prob-stat'>Problem Statement: {camp_title} </h2>

                <Form>
                    <Form.Group>
                        <Form.Label id='idea_title'>Idea Title:</Form.Label>
                        <Form.Control
                            id="idea_title_box"
                            type="text"
                            name="idea_title"
                            placeholder="Enter the title for your idea. (max 300 words)"
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id='idea_des'>Idea Description:</Form.Label>
                        <Form.Control
                            id="idea_des_box"
                            as="textarea"
                            rows={500}
                            name="idea_summary"
                            placeholder="Enter the description of your idea. (max 1000 words)"
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id='idea_how'>Idea Implimentation:</Form.Label>
                        <Form.Control
                            id="idea_how_box"
                            as="textarea"
                            rows={500}
                            name="idea_description"
                            placeholder="Explain how your idea will be implimented (max 1000 words)"
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>
                </Form>
                <div>
                    <button className='igoback-btn' onClick={goBack}>Go Back</button>
                    <button className="idea-post-btn" name="post-idea" onClick={handleSubmit}>Post</button>
                </div>
            </div>
        </div>

    );
}

export default Idea;