import '../../assets/CommentItem.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment, changeVoteComment } from '../../actions/comments'
import ConfirmModal from '../Utils/ConfirmModal'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

class CommentItem extends Component {
    state = {
        showConfirmDeleteModal: false,
    }

    openConfirmDeleteModal = () => this.setState({ showConfirmDeleteModal: true })
    closeConfirmDeleteModal = () => this.setState({ showConfirmDeleteModal: false })

    render () {
        const { comment, editFunction, deleteComment, changeVoteComment } = this.props
        const { showConfirmDeleteModal } = this.state

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
                                    onClick={this.openConfirmDeleteModal}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </div> 
                </div>

                <ConfirmModal 
                    open={showConfirmDeleteModal} 
                    onConfirm={() => deleteComment(comment.id)} 
                    onCancel={this.closeConfirmDeleteModal} 
                    itemType="comment" />
            </div>
        )
    }    
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