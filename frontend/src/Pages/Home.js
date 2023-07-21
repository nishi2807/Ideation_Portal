import React from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import FadingCarousel from "./FadingCarousel";

function Home() {
    const Navigate = useNavigate();

    const logout = () => {
        Navigate('/');
    }

    const campaign = () => {
        Navigate('/campaign');
    }

    const images = [
        require('./mark-fletcher-brown-nN5L5GXKFz8-unsplash.jpg'),
        require('./absolutvision-82TpEld0_e4-unsplash.jpg'),
        require('./kvalifik-5Q07sS54D0Q-unsplash.jpg')
    ]

    return (
        <div className="home-page">
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" style={{ color: '#FFa559' }}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={campaign}>Campaigns</p>
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
            <div className="main-content">
                <div className="carousel">
                    <FadingCarousel images={images}></FadingCarousel>
                </div>
                <div className="report-con">
                    <p className="ideas"></p>
                    <p className="idea-text">Total Ideas: </p>
                    <p className="camp"></p>
                    <p className="camp-text">Total Campaigns: </p>
                    <p className="report"></p>
                    <p className="report-text">Total Votes: </p>
                </div>
            </div>
        </div>
    );
};

export default Home;