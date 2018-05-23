import '../assets/PostItem.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { deletePost, changeVotePost } from '../actions/posts'
import Tooltip from '@material-ui/core/Tooltip'

class PostItem extends Component {
    
    changeVote (option) {
        this.props.changeVotePost(this.props.post.id, option)
    }

    render() {
        const { post, isHome } = this.props

        return (
            <div className="post-item">
                {isHome && (
                    <div className="category"><span>{post.category.toUpperCase()}</span></div>
                )}            
                <header className="post-item-header">
                    <div className="title">
                        <h4>{post.title}</h4>
                        <Button variant="flat">
                            <Link to={`/posts/${post.id}`}>DETAILS</Link>
                        </Button>
                    </div>
                    <div className="author">
                        <span>
                            By <span className="author-name">{post.author}</span> 
                            ({new Date(post.timestamp).toLocaleString()})
                        </span>
                    </div>              
                </header>
                <footer className="post-item-footer">
                    <div className="votes">
                        <span>Vote Score: {post.voteScore}</span>
                        <Tooltip title="Upvote">
                            <IconButton className="icon-button"
                                        onClick={() => this.changeVote("upVote")}>
                                <Icon>thumb_up</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Downvote">
                            <IconButton className="icon-button"
                                        onClick={() => this.changeVote("downVote")}>
                                <Icon>thumb_down</Icon>
                            </IconButton>
                        </Tooltip>
                    </div>                    
                    <div className="comments">
                        <span>{post.commentCount}</span>
                        <Tooltip title="Comments"><Icon>comment</Icon></Tooltip>
                    </div>                    
                </footer>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId)),
    changeVotePost: (post, option) => dispatch(changeVotePost(post, option))
})

export default connect(
    null,
    mapDispatchToProps
)(PostItem)