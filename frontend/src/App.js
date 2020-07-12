import React, { useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { Switch, Route, useLocation } from "react-router-dom";
import { UserContext } from "./contexts/userContext";

import "./App.scss";
import "remixicon/fonts/remixicon.css"

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CookieNotice from "./components/CookieNotice";
// import PrivacyPolicy from "./components/PrivacyPolicy"

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Mills from "./pages/Mills/Mills";
import Mill from "./pages/Mill/Mill";
import Users from "./pages/Users";

function App() {
  const { token, validateToken, logout } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwt");
    if (token) {
      validateToken(token);
    } else {
      logout(location.pathname);
    }
  }, []);

  return (
    <div className="container__app_root">
      <CookieNotice />

      <NavBar />
      <div className="content__wrap">
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/login"><Login /></Route>
          <Route exact path="/mills"><Mills /></Route>
          <Route path="/mill/:mill_uuid"><Mill /></Route>
          <Route exact path="/users"><Users /></Route>
          <Route> <div>NOT FOUND</div></Route>
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
