import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './styles/App.css';
import SignUp from "./components/signup.component";
import Login from "./components/login.component";
import Home from "./components/home.component";
import Navbar from "./components/navbar.component";
import Calendar from "./components/calendar.component";
import WallsburgCalendar from './components/wallsburg_calendar.component';
import LavaCalendar from './components/lava_calendar.component';




function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/users/login" component={Login} />
      <Route path="/users/register" component={SignUp} />
      <Route exact path="/wallsburg-cabin" component={WallsburgCalendar} />
      <Route path="/lava-cabin" component={LavaCalendar} />
    </Router>
  );
}

export default App;