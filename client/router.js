import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Layouts

// Pages
import App from './modules/App'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Template from './modules/Template'
import Boards from './modules/Boards'
import Board from './modules/Board'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Template}/>
      <Route path="/boards" component={Boards}/>
  	  <Route path="/boards/:boardId" component={Board}/>
      <Route path="/repos" component={Repos}>
    	<Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
    </Route>
  </Router>
);