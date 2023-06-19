import React from 'react';
import { Form } from "react-bootstrap";
import './Signup.css';
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="login-bg">
            <div className="login-main-con">
                <div className="text-con">
                    <h1 className="heading">Ideation Portal</h1>
                </div>
                <div className="org-con">
                    <p className="slogan">"Unleash your creativity and bring your ideas to life with our ideation portal"</p>
                </div>
                <div className="login-con">
                    <h2 className="signup-text">SignUp</h2>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label id='signup-subheading-name'>Full Name</Form.Label>
                            <Form.Control
                                id="signup-box-name"
                                type="name"
                                placeholder="Full Name"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label id='signup-subheading-email'>Email</Form.Label>
                            <Form.Control
                                id="signup-box-email"
                                type="email"
                                placeholder="Email"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label id='signup-subheading-pass'>Password</Form.Label>
                            <Form.Control
                                id="signup-box-pass"
                                type="password"
                                placeholder="Password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label id='signup-subheading-pass'>Password</Form.Label>
                            <Form.Control
                                id="signup-box-pass"
                                type="password"
                                placeholder="Password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <button className="signup-button">SignUp</button>
                    </div>
                    <div>
                        <p className="no-acc">
                            Already have an account? <Link to="/">LogIn</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;