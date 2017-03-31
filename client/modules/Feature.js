var React = require('react');
import { connect } from 'react-redux';
import store from '../store.js';
import axios from 'axios';
var stringHelpers = require('../utilities/stringHelpers.js');

function CommentList(props) {
	const comments = props.comments;
	console.log("Mapping undefined here?");
	const listComments = comments.map((comment) => 
		<li className ="list-group-item" key={comment.comment_id}>
			<div className="commentText">
				<p className="">{comment.comment_text}</p> <span className="date sub-text">on {comment.added_date}</span>
			</div>
		</li>
	);
	return <ul className="commentList">{listComments}</ul>
}

var Feature = React.createClass({
    getInitialState: function() {
		return { 
			voted : false 
		};
    },
	upvote: function(board_id, feature_id) {
		var uri = this.state.voted ? "http://localhost:8080/api/v1/unvote/%s/%s" : "http://localhost:8080/api/v1/upvote/%s/%s";
		var featureUpvotePath = stringHelpers.parse(uri, board_id, feature_id);
		axios.post(featureUpvotePath)
		  .then(response => {
		    this.setState({ voted: true });
		  })
		  .catch(function (error) {
		    console.log("PROBLEMS!");
		    console.log(error);
		  });
	},
	comment: function(board_id, feature_id) {
		var comment = this.refs.comment.value;
		var payload = {
			comment_text: comment,
			board_id: board_id,
			feature_id: feature_id
		}
		var addCommentPath = "http://localhost:8080/api/v1/add/comment";

		axios.post(addCommentPath, payload).then(response => {
		  	store.dispatch({
	    		type: 'FEATURE_ADD_COMMENT',
	    		newComment: payload
	    	})
		  })
		  .catch(function (error) {
		  	console.log("PROBLEMS!");
		  	console.log(error);
		  })
	},
	fetchCommentsOfFeature: function(board_id, feature_id) {
		console.log("BoardId", board_id, "FEATURE", feature_id);
		var commentResourcePath = stringHelpers.parse("http://localhost:8080/api/v1/commentsOfFeature/%s/%s", board_id, feature_id);
		axios.get(commentResourcePath)
		  .then( response => {
	        store.dispatch({
	          type: 'FEATURE_DESCRIBE',
	          returned_comments: response.data
	        });		  	
		  })
		  .catch(function (error) {
		    store.dispatch({
		      type: 'FEATURE_DESCRIBE',
		      returned_board: []
		    });
		    console.log("PROBLEMS fetching comments of Feature of Board: ", featureId, boardId);
		    console.log(error);
		  })
	},

	componentDidMount: function() {
	    var board_id = this.props.board_id;
	    var feature_id = this.props.feature_id;

	    console.log("BoardId: ", board_id, "feature_id", feature_id);

		// Get comments
		this.fetchCommentsOfFeature(board_id, feature_id);
	},
	render: function() {
	    var statusMap = { 
	      0: "Pending Decision", 
	      1: "Planned", 
	      2: "Will not do", 
	      3: "Currently working on", 
	      4: "Incorporated!"
	    };
		return ( 
		  	<div className="accordion-group">
			  	<h3 className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">{this.props.feature_summary}<span className="badge badge-default badge-pill" id="featureStatus">{statusMap[this.props.status]}</span></h3>
			  	<div id="collapseOne" className="accordion-body collapse">
			  		<div className="accordion-inner">
			  			<div>{this.props.feature_text}</div>
						<div className="detailBox">
						    <div className="actionBox">
						    	<CommentList comments = { store.getState().featureState.comments }/>
						        <form className="form-inline" role="form">
						            <div className="form-group">
						                <input className="form-control" type="text" ref="comment" placeholder="Tell us what you really think" />
						            </div>
						            <div className="form-group">
						                <button className="btn btn-default" onClick = { () => this.comment(this.props.board_id, this.props.feature_id ) } >Add</button>
						            </div>
						        </form>
						    </div>
						</div>			  			
						<button className="btn btn-success" data-toggle="button" aria-pressed= { this.state.voted } onClick = { () => this.upvote(this.props.board_id, this.props.feature_id) } >I want this!</button>
		  			</div>
		    	</div>
	    	</div> 
		)
	}
});

module.exports = Feature