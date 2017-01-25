var React = require('react')

var FeatureRequest = React.createClass({
  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">
          I have an idea for a new feature
        </button>
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Feature Request</h4>
              </div>
              <div className="modal-body">
                <div className="main clearfix">
                  <form>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input type="email" className="form-control" ref="name" aria-describedby="emailHelp" placeholder="What is your name friend?"/>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email</label>
                      <input type="email" className="form-control" ref="email" aria-describedby="emailHelp" placeholder="How should we contact you?"/>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Organization</label>
                      <input type="email" className="form-control" ref="organization" aria-describedby="emailHelp" placeholder="Where do you work?"/>
                    </div>
                    <div className="form-group">
                      <label for="exampleTextarea">What I want from you</label>
                      <textarea className="form-control" ref="feature" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Feature Title</label>
                      <input type="email" className="form-control" ref="featureTitle" aria-describedby="emailHelp" placeholder="What should we call this?"/>
                    </div>
                    <div className="form-inline">
                      <label className="mr-sm-2" for="inlineFormCustomSelect">I would</label><t/>
                      <select ref="desire" className="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
                        <option value="1" selected >be willing to pay for this</option>
                        <option value="2">may be willing to pay for this</option>
                        <option value="3">would not be willing to pay this, but still want it</option>
                      </select>
                    </div>          
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={ this.saveAndContinue } data-dismiss="modal">Do it!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    // Get values via this.refs
    var data = {
      name          : this.refs.name.value,
      email         : this.refs.email.value,
      organization  : this.refs.organization.value,
      featureTitle  : this.refs.featureTitle.value,
      answer        : this.refs.feature.value,
      desire        : this.refs.desire.value, 
    }
    console.log(data)
    console.log(this.props)

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = FeatureRequest