import '../assets/CommentItem.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import { deleteComment, changeVoteComment } from '../actions/comments'
import CommentModal from './CommentModal'
import Dialog from 'material-ui/Dialog'

class PostItem extends Component {

    changeVote (option) {
        this.props.changeVoteComment(this.props.comment.id, option).then(console.log)
    }

    render() {
        const { comment, editFunction, deleteComment } = this.props

        return (
        	<div className="comment-item">            
        		<div className="comment-item-header">
        			<span>By <strong>{comment.author}</strong></span> 
                    <span>{new Date(comment.timestamp).toLocaleString()}</span>   			
        		</div>
        		<div className="comment-item-body">{comment.body}</div>
        		<div className="comment-item-footer">
        			<div className="votes">
        				<span>Vote Score: {comment.voteScore}</span>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Upvote"
                                    onClick={() => this.changeVote("upVote")}>thumb_up</IconButton>   
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Downvote"
                                    onClick={() => this.changeVote("downVote")}>thumb_down</IconButton>   				
        			</div>
                    <div>
                        <IconButton iconClassName="material-icons" 
                            className="icon-button" 
                            tooltip="Edit"
                            onClick={() => editFunction(comment)}>edit</IconButton>
                        <IconButton iconClassName="material-icons" 
                            className="icon-button" 
                            tooltip="Delete"
                            onClick={() => deleteComment(comment.id)}>delete</IconButton>
                    </div> 
        		</div>
        	</div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    changeVoteComment: (commentId, option) => dispatch(changeVoteComment(commentId, option)),
})

export default connect(
    null,
    mapDispatchToProps
)(PostItem)