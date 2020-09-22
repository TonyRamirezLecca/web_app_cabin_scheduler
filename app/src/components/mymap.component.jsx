import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Map from './map.component';
import '../styles/calendar.css';



export default class MyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationInput: '',
            date: new Date()
        }
    }

    onChange = date => this.setState({ date })

    onSubmit = () => {
        console.log('submit')
        window.event.preventDefault();

        let location = `${this.state.locationInput}`;

        Axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyBP0Nmt5png_GzOHi4hCfdwfYGZzX3p8rg'
            }
        }).then((res) => {
            Axios({
                method: 'post',
                url: `http://localhost:5000/locations/${localStorage.getItem('_id')}`,
                data: { 'formatted_address': res.data.results[0].formatted_address, 'coordinates': res.data.results[0].geometry.location, 'date': this.state.date },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.refs.map.getLocations();
            }).catch(err => {
                console.log('error!!', err);
            })
        }).catch(err => {
            console.log(err);
        });


    }

    onLocationChange = ({ target }) => {
        this.setState({
            locationInput: target.value
        })
    }

    render() {
        const isAuthenticated = window.localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            return (
                <div className="mymap_wrapper">
                    <form id="mymap_location-form" onSubmit={this.onSubmit}>
                        <div className="mymap_location_label-ctn">
                            <div className="mymap_location_label-left-line"></div>
                            <div className="mymap_location_label">Where have you been?</div>
                            <div className="mymap_location_label-right-line"></div>
                        </div>
                        <input type="text" name="location" id="mymap_location-input" onChange={this.onLocationChange} required placeholder="Place you've been" />
                        <br />
                        <DatePicker
                            className="mymap_date-picker"
                            required
                            onChange={this.onChange}
                            value={this.state.date}
                        />
                        <button type="submit" id="mymap_location-submit">Add To Map</button>
                    </form>
                    <div className="google-map_ctn"><Map ref="map" /></div>


                </div>
            )
        }
        else {
            return <Redirect to='/users/login' />
        }
    }
}