import React from "react";
import './navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h3 className="ms-title">Ideation Portal</h3>
            <h4 className="ms-username">Username</h4>
            <div className="user-con">
                <img className="user-icon" ></img>
            </div>
        </div>
    );
};

export default Navbar;