import React from "react";
import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";

// import Dashboard from "./components/Dashboard";
import TimeMetrix from "./components/TimeMetrix";
import HeaderBar from "./components/HeaderBar";
import DiscreteSlider from "./components/DiscreteSlider";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./components/Home";

function App() {
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
            <HeaderBar />
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
