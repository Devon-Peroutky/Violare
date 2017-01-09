import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
    	<div>
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                  </button>
                  <a className="navbar-brand page-scroll" href="/">Violare</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      <li>
                          <a className="page-scroll" href="#features">Features</a>
                      </li>
                      <li>
                          <a className="page-scroll" href="#contact">Contact</a>
                      </li>
                  </ul>
              </div>
          </div>
        </nav>
    	  {this.props.children}
        <footer>
          <div className="container">
              <ul className="list-inline">
                  <li>
                      <a href="#">Privacy</a>
                  </li>
                  <li>
                      <a href="#">Terms</a>
                  </li>
                  <li>
                      <a href="#">FAQ</a>
                  </li>
              </ul>
          </div>
        </footer>
		  </div>
    )
  }
})
