import React from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const Navigate = useNavigate();

    const logout = () => {
        Navigate('/');
    }

    const campaign = () => {
        Navigate('/campaign');
    }

    return (
        <div className="home-page">
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" style={{ color: '#FFa559' }}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={campaign}>Campaigns</p>
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
            <div className="main-content">
                <div className="carousel"></div>
                <div className="report-con">
                    <img className="ideas"></img>
                    <p className="idea-text">Total Ideas</p>
                    <img className="camp"></img>
                    <p className="camp-text">Total Campaigns</p>
                    <img className="report"></img>
                    <p className="report-text">Total Reports</p>
                </div>
            </div>
        </div>
    );
};

export default Home;