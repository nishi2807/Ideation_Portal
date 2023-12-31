import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Form } from 'react-bootstrap';
import './Initiate-campaign.css';
import axios from 'axios';
import { useSelector } from 'react-redux';


function Initiate_campaign() {
    const Navigate = useNavigate();
    const home = () => {
        Navigate('/home')
    }

    const logout = () => {
        Navigate('/');
    }

    const campaign = () => {
        Navigate('/campaign');
    }

    const ideation = () => {
        Navigate('/ideation');
    }

    const voting = () => {
        Navigate('/voting');
    }

    const manage = () => {
        Navigate('/manage')
    }

    const CurrentUser_name = useSelector((state) => state.CurrentUser_name)
    const [values, setValues] = useState({
        camp_id: '',
        camp_startdate: '',
        camp_enddate: '',
        vote_enddate: '',
        manage_enddate: '',
        camp_owner: CurrentUser_name,
        camp_title: ''
    });

    const handleInput = (event) => {
        // Limit the year to four digits
        if (event.target.name === 'camp_startdate' || event.target.name === 'camp_enddate'
            || event.target.name === 'vote_enddate' || event.target.name === 'manage_enddate') {
            if (event.target.value.length > 10) {
                event.target.value = event.target.value.slice(0, 10);
            }
    
            // Compare selected date with current date
            const selectedDate = new Date(event.target.value);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
    
            // Set the input value to current date if it's before the current date
            if (selectedDate.getTime() < currentDate.getTime()) {
                alert('Select Current Date or Future Date')
                const currentDateString = currentDate.toISOString().slice(0, 10);
                // event.target.value = currentDateString;
                event.target.value = '';
            }
        }
    
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
       

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8081/campaign/initiate', { camp_id: values.camp_id, camp_startdate: values.camp_startdate, camp_enddate: values.camp_enddate, vote_enddate: values.vote_enddate, manage_enddate: values.manage_enddate, camp_owner: values.camp_owner, camp_title: values.camp_title })
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
                <p className="menu-content" style={{ color: '#6CB4EE' }} onClick={campaign}>Campaigns</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={ideation}>Ideation</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={voting}>Voting</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={manage}>Management</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className='main-content'>
                {/* <button className='create-group' onClick={createGroup}>Create New Group</button> */}
                {/* <button className='create-group' onClick={initiate_camp}>Initiate Campaign</button> */}
                {/* <div className='ver-line'></div> */}

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
                                value={values.camp_owner} 
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
                            <Form.Label id='camp_end'>End Date (for idea posting):</Form.Label>
                            <Form.Control
                                id="camp_end_box"
                                type="date"
                                name="camp_enddate"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='voting_end'>End Date (for Voting):</Form.Label>
                            <Form.Control
                                id="voting_end_box"
                                type="date"
                                name="vote_enddate"
                                min={values.camp_enddate}
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='manage_end'>End Date (for management):</Form.Label>
                            <Form.Control
                                id="manage_end_box"
                                type="date"
                                name="manage_enddate"
                                min={values.vote_enddate}
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