import React, { Component } from 'react';
import axios from 'axios';
import "../styles/signin.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const forestImg = require.context("../../public/images", true);
const forest = forestImg("./forest.jpg");

toast.configure();


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:5000/users/login', newUser)
            .then(res => {
                let data = JSON.parse(res.data);
                window.localStorage.setItem('isAuthenticated', true);
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('_id', data.id);
                window.localStorage.setItem('name', data.name);
                this.props.history.push('/calendar');
                window.location.reload(false);
            })
            .catch(() => {
                window.localStorage.setItem('isAuthenticated', false);
                toast('Wrong email or password', { type: 'error' });
            });
    }

    onEmailChange = ({ target }) => {
        this.setState({
            email: target.value
        })
    }

    onConfirmEmailChange = ({ target }) => {
        this.setState({
            confirm_email: target.value
        })
    }

    onPasswordChange = ({ target }) => {
        this.setState({
            password: target.value
        })
    }
    onConfirmPasswordChange = ({ target }) => {
        this.setState({
            confirm_password: target.value
        })
    }

    render() {


        return (
            <div className="login_wrapper" style={{ backgroundImage: `url(${forest})` }}>
                <form id="login_form" onSubmit={this.onSubmit}>
                    <div className="signup_label-ctn">
                        <div className="login_label-left-line"></div>
                        <div className="login_label">Login</div>
                        <div className="login_label-right-line"></div>
                    </div>
                    <input
                        autoFocus
                        required
                        type="email"
                        id="login_email"
                        name="login_email"
                        placeholder="Email"
                        onChange={this.onEmailChange}
                    ></input>
                    <br />
                    <input
                        required
                        type="password"
                        id="login_password"
                        name="login_password"
                        placeholder="Password"
                        onChange={this.onPasswordChange}
                    ></input>
                    <button type="submit" id="login_submit">Login Now</button>
                </form>
            </div>
        )
    }


}