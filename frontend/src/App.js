import React, { useEffect, useState } from "react";
import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

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
  }, []);

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
      warning: {
        main: "#BF2727",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Home />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
