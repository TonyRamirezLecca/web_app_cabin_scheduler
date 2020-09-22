import React, { Component } from 'react';
import { DatePicker, theme } from 'react-trip-date';
import { ThemeProvider } from 'styled-components';
import { Redirect } from 'react-router-dom';
import '../styles/calendar.css'
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const forestImg = require.context("../../public/images", true);
const forest = forestImg("./forest.jpg");

toast.configure();



export default class LavaCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBookings_Lava: [],
            newBookings_Lava: [],
            name: localStorage.getItem('name'),
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:5000/calendar/lava`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            let currentBookings_Lava = [];
            res.data.map((el) => {
                return currentBookings_Lava = [...currentBookings_Lava, ...el.bookedTime];
            })
            this.setState({
                currentBookings_Lava: currentBookings_Lava
            })
        });
    }

    handleResponsive = setNumberOfMonth => {
        let width = document.querySelector('.tp-calendar').clientWidth;
        if (width > 900) {
            setNumberOfMonth(3);
        } else if (width < 900 && width > 580) {
            setNumberOfMonth(2);
        } else if (width < 580) {
            setNumberOfMonth(1);
        }
    };

    onChange_Lava = newBookings_Lava => {
        this.setState({
            newBookings_Lava
        })
    };

    handleStripe_Lava = token => {
        console.log('clicked Lava');
        console.log(this.state.newBookings_Lava);
        //Post to STRIPE
        if (this.state.newBookings_Lava.length === 0) {
            toast("Add something to your calendar first", { type: "error" });
        }
        else {
            axios.post(
                `http://localhost:5000/checkout/`,
                { token }
            ).then((res) => {
                let status = res.data.status;
                if (status === "success") {
                    //POST TO CALENDAR
                    const newBookings = {
                        newBookings: this.state.newBookings_Lava
                    }
                    axios({
                        method: 'post',
                        url: `http://localhost:5000/calendar/lava`,
                        data: newBookings,
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((res) => {
                        localStorage.setItem('success', "true");
                        window.location.reload(false);
                    }).catch((err) => {
                        toast("Something went wrong here", { type: "error" });
                    })
                }
                else {
                    toast("Something went wrong", { type: "error" });
                }
            }).catch((err) => {
                toast("Something went wrong", { type: "error" });
            })
        }
    }

    render() {
        if (localStorage.getItem('isAuthenticated') === "true") {
            if (localStorage.getItem('success') === "true") {
                toast("Success! Check email for details", { type: "success" });
                localStorage.removeItem('success');
            }
            return (
                <React.Fragment>
                    <div className="book_calendar_wrapper" style={{ backgroundImage: `url(${forest})` }}>
                        <ThemeProvider theme={theme}>
                            <DatePicker
                                handleChange={this.onChange_Lava}
                                numberOfMonths={1}
                                numberOfSelectableDays={7} // number of days you need 
                                disabledDays={this.state.currentBookings_Lava} //disabeld days
                                responsive={this.handleResponsive} // custom responsive, when using it, `numberOfMonths` props not working
                            />
                        </ThemeProvider>
                        <StripeCheckout
                            className="calendar_submit-ctn"
                            stripeKey="pk_test_qHPhpqb3JW5YlSMJP3lHrahs00xgkxOUOO"
                            token={this.handleStripe_Lava}
                            amount={2000}
                            name="Reserve the Cabin"
                            label="Book"
                        />
                    </div>
                </React.Fragment>
            );
        }
        else {
            return <Redirect to="/users/login" />
        }
    }
}
