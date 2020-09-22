import React, { Component } from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
const forestImg = require.context("../../public/images", true);
const forest = forestImg("./lava.MOV");

export default class Home extends Component {
    render() {
        return (
            <div className="home_wrapper" >
                <video autoPlay muted src={forest}></video>

                <div className="home_text-ctn">
                    <h1>STEELE AWAY</h1>
                    {
                        localStorage.getItem('isAuthenticated') === 'true' ?
                            <Link to="/calendar">Book Now</Link> :
                            <Link to="/users/register">Book Now</Link>
                    }

                </div>


                <div className="darken_background"></div>

            </div>
        )
    }
}