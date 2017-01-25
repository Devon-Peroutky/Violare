import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Layouts

// Pages
import App from './modules/App'
import Template from './modules/Template'
import Boards from './modules/Boards'
import Board from './modules/Board'
import UserLogin from './modules/UserLogin'
import UserRegistration from './modules/UserRegistration'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Template}/>
      <Route path="/boards" component={Boards}/>
  	  <Route path="/boards/:boardId" component={Board}/>
      <Route path="/user/login" component={UserLogin}/>
      <Route path="/user/registration" component={UserRegistration}/>
      <Route path="/user/:userId" component={App}/>
    </Route>
  </Router>
);