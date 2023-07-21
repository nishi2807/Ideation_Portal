import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Form } from 'react-bootstrap';
import './Initiate-campaign.css';
import axios from 'axios';


function Initiate_campaign() {
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
        camp_id: '',
        camp_startdate: '',
        camp_enddate: '',
        camp_owner: '',
        camp_title: ''
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8081/campaign/initiate', { camp_id: values.camp_id, camp_startdate: values.camp_startdate, camp_enddate: values.camp_enddate, camp_owner: values.camp_owner, camp_title: values.camp_title })
            .then(res => {
                alert("Successfully initiated the campaign !");
                Navigate('/campaign')
            })
            .catch(error => {
                console.error('Error:', error.response.data);
                // Handle the error
            });
    }


    return (
        <div>
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
                <p className="menu-content">About Us</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Settings</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className='main-content'>
                <button className='create-group' onClick={createGroup}>Create New Group</button>
                <button className='ini-camp' onClick={initiate_camp}>Initiate Campaign</button>
                <div className='ver-line'></div>

                <div className='create-group-con'>
                    <h3 className='camp-heading'>Initiate a New Campaign</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label id='camp_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="camp_id_box"
                                type="text"
                                name="camp_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_statement'>Problem Statement:</Form.Label>
                            <Form.Control
                                id="camp_statement_box"
                                type="text"
                                name="camp_title"
                                placeholder="Enter the problem statement for the campaign"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_owner'>Campaign Owner:</Form.Label>
                            <Form.Control
                                id="camp_owner_box"
                                type="name"
                                name="camp_owner"
                                placeholder="Enter your full name"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_start'>Start Date:</Form.Label>
                            <Form.Control
                                id="camp_start_box"
                                type="date"
                                name="camp_startdate"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_end'>End Date:</Form.Label>
                            <Form.Control
                                id="camp_end_box"
                                type="date"
                                name="camp_enddate"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <button className="inicamp-btn" name="init-camp" onClick={handleSubmit}>Initiate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Initiate_campaign;