import React, { Component } from 'react';
import axios from 'axios';
import "../styles/signup.css";
const forestImg = require.context("../../public/images", true);
const forest = forestImg("./forest.jpg");

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newEmail: '',
            newPassword: '',
            confirm_newEmail: '',
            confirm_newPassword: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.newName,
            email: this.state.newEmail,
            password: this.state.newPassword,
            confirm_password: this.state.confirm_newPassword,
            confirm_email: this.state.confirm_newEmail
        }

        axios.post('http://localhost:5000/users/register', newUser)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/users/login');
            })
            .catch(error => console.log('error with adding new user: ' + error));
    }

    onNameChange = ({ target }) => {
        this.setState({
            newName: target.value
        })
    }

    onEmailChange = ({ target }) => {
        this.setState({
            newEmail: target.value
        })
    }

    onPasswordChange = ({ target }) => {
        this.setState({
            newPassword: target.value
        })
    }

    onConfirmEmailChange = ({ target }) => {
        this.setState({
            confirm_newEmail: target.value
        })
    }

    onConfirmPasswordChange = ({ target }) => {
        this.setState({
            confirm_newPassword: target.value
        })
    }

    render() {
        return (
            <div className="signup_wrapper" style={{ backgroundImage: `url(${forest})` }}>
                <form onSubmit={this.onSubmit} id="signup_form">
                    <div className="signup_label-ctn">
                        <div className="signup_label-left-line"></div>
                        <div className="signup_label">Register</div>
                        <div className="signup_label-right-line"></div>
                    </div>
                    <input
                        autoFocus
                        required
                        type="text"
                        id="signup_name"
                        name="signup_name"
                        placeholder="Name"
                        onChange={this.onNameChange}
                    ></input>
                    <br />
                    <input
                        type="email"
                        id="signup_email"
                        name="signup_email"
                        placeholder="Email"
                        required
                        onChange={this.onEmailChange}
                    ></input>
                    <br />
                    <input
                        type="email"
                        id="confirm-signup_email"
                        name="confirm-signup_email"
                        placeholder="Confirm Email"
                        required
                        onChange={this.onConfirmEmailChange}
                    ></input>
                    <br />
                    <input
                        type="password"
                        id="signup_password"
                        name="signup_password"
                        placeholder="Password"
                        minLength="6"
                        required
                        onChange={this.onPasswordChange}
                    ></input>
                    <br />
                    <input
                        required="true"
                        type="password"
                        id="confirm-signup_password"
                        name="confirm-signup_password"
                        placeholder="Confirm Password"
                        minLength="6"
                        required
                        onChange={this.onConfirmPasswordChange}
                    ></input>
                    <br />
                    <button type="submit" id="signup_submit">Register Now</button>
                </form>
            </div>
        )
    }
}
