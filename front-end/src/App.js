import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage' 
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* <Route exact path="/">
            <LandingPage />
          </Route> */}
          
          {/* 위의 방식과 동일함. */}
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          {/* <Route exact path="/login" component={Auth(LoginPage, false, true)}/> : Admin만 들어가게 하고 싶다면 3번째 인자에 true를 넘겨준다. */}
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, true)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;