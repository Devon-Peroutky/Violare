var React = require('react');
import { EmailSignUpForm } from "redux-auth/bootstrap-theme";

var UserRegistration = React.createClass({
	render: function() {
		return <EmailSignUpForm/>
	}
});

module.exports = UserRegistration