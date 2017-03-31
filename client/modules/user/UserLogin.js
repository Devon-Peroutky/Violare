import React from 'react';


const UserLogin = React.createClass({

	getInitialState: function() {
		return {};
	},

	onSuccess: function(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
		browser
	},

	onFailure: function(error) {
		console.log(error);
	},

	componentDidMount: function() {
	  console.log("RENDERING THIS BUTTON");
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      });
	},

	render: function() {
		return <div id='my-signin2'></div>
	}
});

module.exports = UserLogin;