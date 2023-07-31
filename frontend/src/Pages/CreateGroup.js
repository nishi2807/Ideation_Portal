import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './createGroup.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function CreateGroup() {

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

    const [values, setValues] = useState({
    })

    // const [confirmationStatus, setConfirmationStatus] = useState(false);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
        console.log(values)
    }


    const updatedb = (id, email, role) => {
        return axios.post('http://localhost:8081/campaign/emails', {
            camp_id: id,
            camp_user_email: email,
            camp_user_role: role,
        });
    };

    const initiateing_camp = (id, start, end, voteend, manageend, ownner, title) => {
        return axios.post('http://localhost:8081/campaign/initiate', {
            camp_id: id,
            camp_startdate: start,
            camp_enddate: end,
            vote_enddate: voteend,
            manage_enddate: manageend,
            camp_owner: ownner,
            camp_title: title
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Promise.all([
                updatedb(values.camp_ideation_id, values.camp_ideation_user_email, 'I'),
                updatedb(values.camp_ideation_id, values.camp_voting_user_email, 'V'),
                updatedb(values.camp_ideation_id, values.camp_management_user_email, 'M'),
                initiateing_camp(values.camp_ideation_id, values.camp_startdate, values.camp_enddate, values.vote_enddate, values.manage_enddate, values.camp_owner, values.camp_title)
            ]);
            alert('Campaign Initiated Successfully!');
            Navigate('/campaign');
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <div className='home-page'>
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
                    <h3 className='camp-heading'>Initiate Campaign</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label id='camp_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="camp_id_box"
                                type="text"
                                name="camp_ideation_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                // onBlur={handleBlur}    
                                // value={values.camp_ideation_id}                         
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_user'>Ideation Group:</Form.Label>
                            <Form.Control
                                id="camp_user_box"
                                type="email"
                                name="camp_ideation_user_email"
                                placeholder="Enter email id of user seperated with commas (,)"
                                // value={values.camp_ideation_user_email}
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                    {/* <hr className='hr-create-group'></hr> */}
                    {/* <h3 className='vote-heading'>Create Voting Group</h3> */}
                    <Form>
                        {/* <Form.Group>
                            <Form.Label id='vote_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="vote_id_box"
                                type="text"
                                name="camp_voting_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Label id='vote_user'>Voting Group:</Form.Label>
                            <Form.Control
                                id="vote_user_box"
                                type="email"
                                name="camp_voting_user_email"
                                placeholder="Enter email id of user seperated with commas (,)"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        {/* <hr className='hr-vote-group'></hr> */}
                    </Form>
                    {/* <h3 className='manage-heading'>Create Management Group</h3> */}
                    <Form>
                        {/* <Form.Group>
                            <Form.Label id='manage_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="manage_id_box"
                                type="text"
                                name="camp_management_id"
                                placeholder="Enter Campaign ID"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Label id='manage_user'>Management User:</Form.Label>
                            <Form.Select
                                id="manage_user_box"
                                // type="email"
                                name="camp_management_user_email"
                                // placeholder="Enter email id of user seperated with commas (,)"
                                onChange={handleInput}
                                required
                            >
                                <option value="">Select Management User</option>
                                <option value="user1@gmail.com">User1 (user1@gmail.com)</option>
                                <option value="user2@gmail.com">User2 (user2@gmail.com)</option>
                            </Form.Select>
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
                        <button className="savegroup-btn" name="save-group" onClick={handleSubmit}>Initiate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup;