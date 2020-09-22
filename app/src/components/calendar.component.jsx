import React, { Component } from 'react';
import '../styles/calendar.css'
import WallsburgCalendar from './wallsburg_calendar.component';
import LavaCalendar from './lava_calendar.component';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from "react-router-dom";
const forestImg = require.context("../../public/images", true);
const lavaCabin = forestImg("./lavaCabin.jpg");
const wallsburgCabin = forestImg("./wallsburgCabin.jpg");
const forest = forestImg("./forest.jpg");


export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('name'),
        }
    }

    rearrangeLayout = () => {
        document.querySelector('.choose_calendar-ctn').classList.add('rearrange_calendar-link');
    }

    render() {
        if (localStorage.getItem('isAuthenticated') === "true") {
            return (
                <div class="calendar_wrapper" style={{ backgroundImage: `url(${forest})` }}>
                    <div className="choose_calendar-ctn">
                        <Link className="choose_calendar-link" onClick={this.rearrangeLayout} to="/wallsburg-cabin" style={{ backgroundImage: `url(${wallsburgCabin})` }}><p>Wallsburg</p><div className="choose_calendar-darken"></div></Link>
                        <Link className="choose_calendar-link" onClick={this.rearrangeLayout} to="/lava-cabin" style={{ backgroundImage: `url(${lavaCabin})` }}><p>Lava</p><div className="choose_calendar-darken"></div></Link>
                    </div>
                </div>
            );
        }
        else {
            return <Redirect to="/users/login" />
        }
    }
}