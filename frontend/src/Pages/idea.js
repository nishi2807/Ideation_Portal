import React from 'react';
import Navbar from '../Components/Navbar';
import './idea.css'
import { Form } from 'react-bootstrap';

function Idea() {
    return (
        <div className='home-page'>
            <Navbar></Navbar>

            <div className='main-form'>
                <h1 className='form-heading'>Post Your Ideas for Camp_Id</h1>
                <h2 className='prob-stat'>Problem Statement: </h2>

                <Form>
                    <Form.Group>
                        <Form.Label id='idea_title'>Idea Title:</Form.Label>
                        <Form.Control
                            id="idea_title_box"
                            type="text"
                            name="idea_title"
                            placeholder="Enter the title for your idea. (max 100 words)"
                            // onChange={handleInput}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id='idea_des'>Idea Description:</Form.Label>
                        <Form.Control
                            id="idea_des_box"
                            as="textarea"
                            rows={500}
                            name="idea_description"
                            placeholder="Enter the description of your idea. (max 1000 words)"
                            // onChange={handleInput}
                            required
                        />
                    </Form.Group>
                </Form>
                <div>
                    <button className="idea-post-btn" name="post-idea" >Post</button>
                </div>
            </div>
        </div>

    );
}

export default Idea;