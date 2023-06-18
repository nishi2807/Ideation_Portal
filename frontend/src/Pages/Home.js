import React from "react";
import Navbar from "../Components/Navbar";
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" style={{color: '#FF7500'}}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Campaigns</p>
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
            </div>
            <div className="main-con"></div>
        </div>
    );
};

export default Home;