import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Layouts

// Pages
import App from './modules/App'
import Template from './modules/Template'
import Boards from './modules/Boards'
import Board from './modules/Board'
import UserLogin from './modules/user/UserLogin'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Template}/>
      <Route path="/boards" component={Boards}/>
  	  <Route path="/boards/:boardId" component={Board}/>
  	  <Route path="/userLogin" component={UserLogin}/>
    </Route>
  </Router>
);