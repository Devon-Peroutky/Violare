var React = require('react')

var FeatureRequest = React.createClass({
  render: function() {
    return ( 
      <div class="main clearfix">
        <form id="nl-form" class="nl-form">
          I am
          <input type="text" ref="name" value="" placeholder="name" data-subline="Your name/title/nickname"/>
          from
          <input type="text" ref="organization" value="" placeholder="organization" data-subline="Your company/organization here"/>
          and I wish you guys had 
          <input type="text" ref="answer" value="" placeholder="this amazing feature" data-subline="For example: Customizable boards"/>
          that I 
          <select>
            <option value="0" selected>may or may not be willing to pay for</option>
            <option value="1">will pay for</option>
            <option value="2">will not be willing to pay for</option>
            <option value="3">need in order to use this product</option>
          </select>          
          <div class="nl-submit-wrap">
            <button class="nl-submit" type="submit" onClick={ this.saveAndContinue }>Go do it!</button>
          </div>
          <div class="nl-overlay"></div>
        </form>
      </div>      
      <div>
        <label>I am </label> 
        <input type="text" ref="name" defaultValue={ this.props.fieldValues.name } />

        <label>and I wish you guys </label>
        <input type="text" ref="answer" defaultValue={ this.props.fieldValues.answer } />

        <button >Get it done!</button>
      </div>
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    // Get values via this.refs
    var data = {
      name          : this.refs.name.value,
      organization  : this.refs.organization.value,
      answer        : this.refs.answer.value,
    }
    console.log(data)
    console.log(this.props)

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = FeatureRequest