import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/nav.css";

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }



    handleLogout = () => {
        localStorage.clear();
        this.forceUpdate();
    }

    render() {

        const isAuthenticated = window.localStorage.getItem('isAuthenticated');

        return (
            <div className="navbar_wrapper">
                <div className="navbar">
                    <ul className="navbar_left">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/calendar">Calendars</Link></li>
                    </ul>
                    <ul className="navbar_right">
                        {isAuthenticated === 'true' ? (
                            <li><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
                        ) : (
                                <React.Fragment>
                                    <li><Link to="/users/login">Sign in</Link></li>
                                    <li><Link to="/users/register">Sign up</Link></li>
                                </React.Fragment>
                            )}
                    </ul>
                </div>
            </div>
        )
    }
}