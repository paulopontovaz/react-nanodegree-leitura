import '../assets/PostItem.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import { deletePost } from '../actions/posts'

class PostItem extends Component {
    render() {
        const { post, isHome, editFunction, deletePost } = this.props

        return (
        	<div className="post-item">
                {isHome && (
                    <div className="category"><span>{post.category.toUpperCase()}</span></div>
                )}            
        		<div className="post-item-header">
        			<div className="title">
                        <h4>{post.title}</h4>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Edit"
                                    onClick={() => editFunction(post)}>edit</IconButton>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Delete"
                                    onClick={() => deletePost(post.id)}>delete</IconButton>
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
                                    tooltip="Upvote">thumb_down</IconButton>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Downvote">thumb_up</IconButton>    				
        			</div>
        			<div className="comments">
                        <span>{post.commentCount} Comments</span>
                        <IconButton iconClassName="material-icons" 
                                    className="icon-button" 
                                    tooltip="Comment">comment</IconButton>                    
                    </div>
        		</div>
        	</div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId))
})

export default connect(
    null,
    mapDispatchToProps
)(PostItem)