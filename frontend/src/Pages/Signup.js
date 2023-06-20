import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import './Signup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Validation from '../Validation/signupvalidation';
import { currentuser } from "./constants";
import { useDispatch } from "react-redux";

function SignUp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(errors);
        setErrors(Validation(values));

        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then (res => {
                // console.log(res)
                alert("Successfully Regitered!")
                Navigate('/home');
            })
            .catch(err => console.log(err));

            axios.post('http://localhost:8081/username', { email: values.email })
                .then(response => {
                    console.log(response.data.name);
                    dispatch({ type: "SET_CURRENT_USER_NAME", payload: response.data.name });
                    currentuser = response.data.name;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

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
                        <Form.Group>
                            <Form.Label id='signup-subheading-name'>Full Name</Form.Label>
                            <Form.Control
                                id="signup-box-name"
                                type="name"
                                name='name'
                                placeholder="Full Name"
                                // value={email}
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Form.Group>
                            <Form.Label id='signup-subheading-email'>Email</Form.Label>
                            <Form.Control
                                id="signup-box-email"
                                type="email"
                                name='email'
                                placeholder="Email"
                                // value={password}
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Form.Group>
                            <Form.Label id='signup-subheading-pass'>Password</Form.Label>
                            <Form.Control
                                id="signup-box-pass"
                                type="password"
                                name='password'
                                placeholder="Password"
                                // value={password}
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <button className="signup-button" name='signup' onClick={handleSubmit}>SignUp</button>
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