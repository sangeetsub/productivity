import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HeaderBar from "./HeaderBar";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import TimeMetrix from "./TimeMetrix";
import TaskDetails from "./TaskDetails";
import BackgroundPage from './BackgroundPage'
import { getUser, isAuthenticated } from "../services/auth";

function Home(props) {
  const {isAuth} = props; 
  return (
    <Router>
      <HeaderBar />
      <Switch>
        <Route exact path="/" component={ isAuth ? TimeMetrix : BackgroundPage} />
        <Route exact path="/task/:id" component={TaskDetails} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>

      <h6> Five Choices of Extraordinary Productivity. </h6>
    </Router>
  );
}

const mapStateToProps = function (state) {
  return {
    isAuth : isAuthenticated(state)
  };
};

export default connect(mapStateToProps)(Home);
