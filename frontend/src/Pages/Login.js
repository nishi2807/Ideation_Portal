import React from "react";
import { Form } from "react-bootstrap";
import '../Pages/Login.css';
import { Link } from "react-router-dom";

function Login() {
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
                    <h2 className="login-text">LogIn</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label id='login-subheading-email'>Email address</Form.Label>
                            <Form.Control
                                id="login-box-email"
                                type="email"
                                placeholder="Email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label id='login-subheading-pass'>Password</Form.Label>
                            <Form.Control
                                id="login-box-pass"
                                type="password"
                                placeholder="Password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <button className="login-button">LogIn</button>
                    </div>
                    <div>
                        <h2 className="option">
                            - Or -
                        </h2>
                    </div>
                    <div>
                        <button className="google-button">Google</button>
                    </div>
                    <div>
                        <p className="no-acc">
                        Don't have an account? <Link to="/signup">SignUp</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;