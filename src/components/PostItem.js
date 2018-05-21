import '../assets/PostItem.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import { deletePost, changeVotePost } from '../actions/posts'
import { getCommentsByPostId } from '../actions/comments'
import CommentModal from './CommentModal'
import CommentItem from './CommentItem'
import Dialog from 'material-ui/Dialog'

class PostItem extends Component {
    state = {
        showComments: false,
        showCommentModal: false,
        modalComment: null,
    }

    componentDidMount () {
        this.props.getCommentsByPostId(this.props.post.id)
    }

    changeVote (option) {
        this.props.changeVotePost(this.props.post.id, option)
    }

    openCommentModal = (comment = null) => this.setState(() => ({ showCommentModal: true, modalComment: comment }))
    closeCommentModal = () => this.setState(() => ({ showCommentModal: false, modalComment: null }))

    render() {
        const { post, isHome, editFunction, deletePost, comments } = this.props
        const { showComments, showCommentModal, modalComment } = this.state

        return (
        	<div className="post-item">
                {isHome && (
                    <div className="category"><span>{post.category.toUpperCase()}</span></div>
                )}            
        		<div className="post-item-header">
        			<div className="title">
                        <h4>{post.title}</h4>
                        <div>
                            <IconButton iconClassName="material-icons" 
                                className="icon-button" 
                                tooltip="Edit"
                                onClick={() => editFunction(post)}>edit</IconButton>
                            <IconButton iconClassName="material-icons" 
                                className="icon-button" 
                                tooltip="Delete"
                                onClick={() => deletePost(post.id)}>delete</IconButton>
                        </div>                        
                    </div>
        			<div className="author">
        				<span>
                            By <span className="author-name">{post.author}</span> 
                            ({new Date(post.timestamp).toLocaleString()})
                        </span>
        			</div>    			
        		</div>
        		<div className="post-item-body">{post.body}</div>
        		<div className="post-item-footer">
        			<div className="votes">
        				<span>Vote Score: {post.voteScore}</span>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Upvote"
                                    onClick={() => this.changeVote("upVote")}>thumb_up</IconButton>   
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Downvote"
                                    onClick={() => this.changeVote("downVote")}>thumb_down</IconButton>                         				
        			</div>
        			<div className="comments">
                        <span>{post.commentCount} Comments</span>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Comment"
                                    onClick={() => this.setState({ showComments: !showComments })}>
                                        comment</IconButton>                    
                    </div>
        		</div>
                {showComments && (
                    <div className="comment-list">
                        <header>
                            <h4>Comment List</h4>
                            <RaisedButton 
                                label="ADD COMMENT" 
                                onClick={() => this.openCommentModal()} 
                                primary={true} />
                        </header>                        
                        {post.comments && post.comments.map(comment => (
                            <CommentItem 
                                key={comment.id} 
                                comment={comment} 
                                editFunction={this.openCommentModal}
                                closeModal={this.closeCommentModal} />
                        ))}
                    </div>
                )}
                
                <Dialog
                  title="Comment"
                  open={showCommentModal}
                  autoScrollBodyContent={true}>
                    <CommentModal 
                      comment={modalComment}
                      closeModal={this.closeCommentModal}
                      postId={post.id} />
                </Dialog>
        	</div>
        )
    }
}

const mapStateToProps = ({ comments }) => ({ comments })

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId)),
    changeVotePost: (post, option) => dispatch(changeVotePost(post, option)),
    getCommentsByPostId: postId => dispatch(getCommentsByPostId(postId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostItem)