import React from "react";
import "./App.css";
// import Dashboard from "./components/Dashboard";
import TimeMetrix from "./components/TimeMetrix";
import HeaderBar from "./components/HeaderBar";
import DiscreteSlider from "./components/DiscreteSlider";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <HeaderBar />
        </div>
        <div className="App">
          <h2> Five Choices of Extraordinary Productivity. </h2>
          {/* <Signin />
          <Signup /> */}
          {/* <ol>
            <li> Act on the Important, don't react to the urgent. </li>
            <li>Go for Extraordinary, don't settle for ordinary</li>
            <li>Schedule the big rocks, don't sort the Gravel.</li>
            <li>Rule your technology, don't let it rule you, </li>
            <li>Fuel your fire, don't burn out.</li>
          </ol> */}
          {/* <TimeMetrix /> */}
          <Switch>
            {/* <Route path="/todos"> */}
            {/* <DiscreteSlider
              defaultValue={4}
              step={1}
              min={1}
              max={10}
              title={"Your Sleep rating"}
            /> */}
            {/* <TimeMetrix /> */}
            {/* </Route> */}
            <Route path="/">
              <Signup />
            </Route>
            <Route path="/a">
              <Signin />
            </Route>
            <Route exact path="productivity/signin">
              <Signin />
            </Route>
            <Route exact path="productivity/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
