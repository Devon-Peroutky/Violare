var React = require('react')

var AccountFields = React.createClass({
  render: function() {
    return ( 
      <div>
        <label>I am </label> 
        <input type="text" ref="name" defaultValue={ this.props.fieldValues.name } />

        <label>and I wish you guys </label>
        <input type="text" ref="answer" defaultValue={ this.props.fieldValues.answer } />

        <button onClick={ this.saveAndContinue }>Get it done!</button>
      </div>
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    // Get values via this.refs
    var data = {
      name     : this.refs.name.value,
      answer   : this.refs.answer.value,
    }
    console.log(data)
    console.log(this.props)

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = AccountFields