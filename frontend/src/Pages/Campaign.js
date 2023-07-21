import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './Campaign.css';

function Campaign() {
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

    const initiate_camp = () => {
        Navigate('/initiate-campaign')
    }

    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" onClick={home}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" style={{ color: '#FFa559' }}>Campaigns</p>
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
            </div>
        </div>
    )
}

export default Campaign;