import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import FadingCarousel from "./FadingCarousel";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
    const Navigate = useNavigate();

    const logout = () => {
        Navigate('/');
    }

    const home = () => {
        Navigate('/home')
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

    const images = [
        require('./mark-fletcher-brown-nN5L5GXKFz8-unsplash.jpg'),
        require('./absolutvision-82TpEld0_e4-unsplash.jpg'),
        require('./kvalifik-5Q07sS54D0Q-unsplash.jpg')
    ]

    const CurrentUser_name = useSelector((state) => state.CurrentUser_name);
    const CurrentUser_role = useSelector((state) => state.CurrentUser_role)
    // console.log(CurrentUser_name)

    const [totalIdeas, setTotalIdeas] = useState(0);
    const [totalCampaigns, setTotalCampaigns] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        axios
            .post('http://localhost:8081/get-user-details', { name: CurrentUser_name })
            .then(response => {
                const { data } = response;
                const { ideas_count, campaigns_count, votes_count } = data;
                setTotalIdeas(ideas_count);
                setTotalCampaigns(campaigns_count);
                setTotalVotes(votes_count);
            })
            .catch(error => {
                console.error('Axios error:', error);
                if (error.response) {
                    console.error('Error status code:', error.response.status);
                    console.error('Error response data:', error.response.data);
                }
                // Handle the error state if needed
            });
    }, [CurrentUser_name]);

    return (
        <div className="home-page">
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" style={{ color: '#6CB4EE' }}>Home</p>
                <hr className="hori-line"></hr>
                {/* {CurrentUser_role === "admin" && (
                    <> */}
                        <p className="menu-content" onClick={campaign}>Campaigns</p>
                        <hr className="hori-line"></hr>
                    {/* </>
                )} */}
                {/* <hr className="hori-line"></hr> */}
                <p className="menu-content" onClick={ideation}>Ideation</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={voting}>Voting</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={manage}>Management</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className="main-content">
                <div className="carousel">
                    <FadingCarousel images={images}></FadingCarousel>
                </div>
                <div className="report-con">
                    <p className="camp"></p>
                    <p className="idea-text" onClick={campaign}>Total Campaigns: {totalCampaigns}</p>
                    <p className="ideas"></p>
                    <p className="camp-text" onClick={ideation}>Total Ideas: {totalIdeas}</p>
                    <p className="report"></p>
                    <p className="report-text" onClick={voting}>Total Votes: {totalVotes}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;