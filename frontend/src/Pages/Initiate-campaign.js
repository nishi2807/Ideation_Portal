import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Form } from 'react-bootstrap';


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

    
    return (
        <div>
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" onClick={home}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" style={{ color: '#FFa559' }} onClick={campaign}>Campaigns</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Your Ideas</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">All Ideas</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Review Ideas</p>
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
                    <h3 className='camp-heading'>Initiate Campaign</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label id='camp_id'>Campaign ID:</Form.Label>
                            <Form.Control
                                id="camp_id_box"
                                type="text"
                                name="camp_id"
                                placeholder="Enter Campaign ID"
                                // onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id='camp_user'>Problem Statement:</Form.Label>
                            <Form.Control
                                id="camp_user_box"
                                type="text"
                                name="camp_user_email"
                                placeholder="Enter the problem statement for the campaign"
                                // onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <button className="savegroup-btn" name="save-group" >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Initiate_campaign;