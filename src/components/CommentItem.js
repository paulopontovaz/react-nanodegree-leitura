import '../assets/CommentItem.css'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { deleteComment, changeVoteComment } from '../actions/comments'

const CommentItem = props => {
    const { comment, editFunction, deleteComment, changeVoteComment } = props

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
                    <IconButton className="icon-button" 
                                tooltip="Upvote"
                                onClick={() => changeVoteComment(comment.id, "upVote")}>
                        <Icon>thumb_up</Icon>
                    </IconButton>   
                    <IconButton className="icon-button" 
                                tooltip="Downvote"
                                onClick={() => changeVoteComment(comment.id, "downVote")}>
                        <Icon>thumb_down</Icon>
                    </IconButton>   				
    			</div>
                <div>
                    <IconButton className="icon-button" 
                                tooltip="Edit"
                                onClick={() => editFunction(comment)}>
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton className="icon-button" 
                                tooltip="Delete"
                                onClick={() => deleteComment(comment.id)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </div> 
    		</div>
    	</div>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    changeVoteComment: (commentId, option) => dispatch(changeVoteComment(commentId, option)),
})

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    changeVoteComment: PropTypes.func.isRequired,
    editFunction: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired, 
}

export default connect(
    null,
    mapDispatchToProps
)(CommentItem)