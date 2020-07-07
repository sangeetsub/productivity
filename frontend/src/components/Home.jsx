import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*
// import Dashboard from "./components/Dashboard";
import TimeMetrix from "./components/TimeMetrix";
import HeaderBar from "./components/HeaderBar";
import DiscreteSlider from "./components/DiscreteSlider";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./components/Home";
import axios from "axios";
import { updateUser } from "./services/auth";
*/

import HeaderBar from "./HeaderBar";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import TimeMetrix from "./TimeMetrix";
import TaskDetails from "./TaskDetails";

function Home() {
  return (
    <Router>
      <HeaderBar />
      <Switch>
        <Route exact path="/" component={TimeMetrix} />
        <Route exact path="/task/:id" component={TaskDetails} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>

      <h6> Five Choices of Extraordinary Productivity. </h6>
    </Router>
  );
}

export default Home;
