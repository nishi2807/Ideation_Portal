import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import '../Pages/Login.css';
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/loginvalidation";
import axios from "axios";
import { currentuser } from "./constants";
import { useDispatch } from "react-redux";

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    // console.log(values.email)

    const [errors, setErrors] = useState({});
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    useEffect(() => {
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', { email: values.email, password: values.password })
                .then(res => {
                    if (res.data === "Success") {
                        alert("Login Successfull!")
                        Navigate('/home');
                    } else {
                        alert("No user found !")
                    }
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
    }, [errors, values, Navigate, dispatch]);

    return (
        <div className="login-bg">
            <div className="login-main-con">
                <div className="text-con">
                    <div className="logo-con">
                        <p className="logo"></p>
                    </div>
                    <h1 className="heading">Ideation</h1>
                </div>
                <div className="org-con">
                    <p className="slogan">"Unleash your creativity and bring your ideas to life with our ideation portal"</p>
                </div>
                <div className="login-con">
                    <h2 className="login-text">LogIn</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label id='login-subheading-email'>Email address</Form.Label>
                            <Form.Control
                                id="login-box-email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Form.Group>
                            <Form.Label id='login-subheading-pass'>Password</Form.Label>
                            <Form.Control
                                id="login-box-pass"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleInput}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <button className="login-button" name="login" onClick={handleSubmit}>LogIn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;