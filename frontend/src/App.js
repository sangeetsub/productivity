import React, { useEffect, useState } from "react";
import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

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

function App() {
  const token = localStorage.prodUserToken;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp > Date.now() / 1000) {
        axios
          .get("http://localhost:8000/user/me", {
            headers: { token: token },
          })
          .then(function (response) {
            // handle success
            setIsLoggedIn(true);
            store.dispatch(updateUser(response.data));
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      } else {
        console.log("Token is no longer valid");
        delete localStorage.prodUserToken;
        window.location.href = "/signin";
      }
    } else {
      // there is no token
    }
  }, [token]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#00838f",
        light: "#4fb3bf",
        dark: "#005662",
      },
      secondary: {
        main: "#26c6da",
        light: "#6ff9ff",
        dark: "#0095a8",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <HeaderBar isLoggedIn={isLoggedIn} />
          </div>
          <div className="App">
            <Switch>
              <Route component={Home} exact path="/" />
              <Route component={Signin} path="/signin" />
              <Route component={Signup} path="/signup" />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
