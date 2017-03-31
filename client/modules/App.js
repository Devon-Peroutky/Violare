import React from 'react';
import NavLink from './NavLink';

const App = React.createClass({
  onFailure: function(error) {
    println("ERROR")
    console.log(error);
  },

  componentDidMount() {
    console.log("WAITING");
    console.log("RENDERING THIS BUTTON");
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn
    });
  },

  render: function() {
    function onSignIn(googleUser) {
      console.log("HEYYYYY");
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
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
        <div className="g-signin2" data-onsuccess={this.onSignIn} />
		  </div>
    )
  },

  onSignIn: function(googleUser) {
    console.log("HEYYYYYYY");
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }  
});

module.exports = App;