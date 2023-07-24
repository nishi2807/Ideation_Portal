import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './createGroup.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function CreateGroup() {

    const Navigate = useNavigate();

    const logout = () => {
        Navigate('/');
    }

    const home = () => {
        Navigate('/home');
    }

    const createGroup = () => {
        Navigate('/create-group');
    }

    const campaign = () => {
        Navigate('/campaign')
    }

    const initiate_camp = () => {
        Navigate('/initiate-campaign')
    }

    const [values, setValues] = useState({
        // camp_id: '',
        // camp_user_email: ''
    })

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
        console.log(values)
    }
    const updatedb = (id,email,role) => {
        axios.post('http://localhost:8081/campaign/emails', { camp_id: id, camp_user_email: email, camp_user_role: role })
            .then(res => {
                alert("Successfully created the group for the campaign !");
                Navigate('/initiate-campaign')
            })
            .catch(error => {
                console.error('Error:', error.response.data);
            });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        updatedb(values.camp_ideation_id, values.camp_ideation_user_email, "I")
        updatedb(values.camp_voting_id, values.camp_voting_user_email, "V")
        updatedb(values.camp_management_id, values.camp_management_user_email, "M")        
    }

    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" onClick={home}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" style={{ color: '#FFa559' }} onClick={campaign}>Campaigns</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Ideation</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Voting</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Management</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className='main-content'>
                {/* <button className='create-group' onClick={createGroup}>Create New Group</button> */}
                <button className='create-group' onClick={initiate_camp}>Initiate Campaign</button>
                <div className='ver-line'></div>

                <div className='create-group-con'>
                    <h3 className='camp-heading'>Ideation Group</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label id='camp_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="camp_id_box"
                                type="text"
                                name="camp_ideation_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_user'>Ideation Users:</Form.Label>
                            <Form.Control
                                id="camp_user_box"
                                type="email"
                                name="camp_ideation_user_email"
                                placeholder="Enter email id of user seperated with commas (,)"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <hr className='hr-create-group'></hr>
                    <h3 className='vote-heading'>Voting Group</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label id='vote_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="vote_id_box"
                                type="text"
                                name="camp_voting_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='vote_user'>Voting Users:</Form.Label>
                            <Form.Control
                                id="vote_user_box"
                                type="email"
                                name="camp_voting_user_email"
                                placeholder="Enter email id of user seperated with commas (,)"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <hr className='hr-vote-group'></hr>
                    </Form>
                    <h3 className='manage-heading'>Management Group</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label id='manage_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="manage_id_box"
                                type="text"
                                name="camp_management_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='manage_user'>Management Users:</Form.Label>
                            <Form.Control
                                id="manage_user_box"
                                type="email"
                                name="camp_management_user_email"
                                placeholder="Enter email id of user seperated with commas (,)"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <hr className='hr-manage-group'></hr>
                    </Form>
                    <div>
                        <button className="savegroup-btn" name="save-group" onClick={handleSubmit}>Create Groups</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup;