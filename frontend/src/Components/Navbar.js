import React from "react";
import './navbar.css';
import { currentuser } from "../Pages/constants";
import { useSelector } from "react-redux";


function Navbar() {
    const CurrentUser_name = useSelector((state) => state.CurrentUser_name);

    return (
        <div className="navbar">
            <div className="ms-logo-container">
                <p className="ms-logo"></p>
            </div>
            <h3 className="ms-title">Ideation</h3>
            <h4 className="ms-username">{CurrentUser_name}</h4>
            <div className="user-con">
                <img className="user-icon" ></img>
            </div>
        </div>
    );
};

export default Navbar;