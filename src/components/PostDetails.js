import '../assets/PostItem.css'
import '../assets/View.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost, changeVotePost, getPostById } from '../actions/posts'
import CommentList from './CommentList'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import PostModal from './PostModal'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'

class PostDetails extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            title: '', 
            author: '', 
            body: '', 
            category: '',
            showPostModal: false,
            modalComment: null,
        }

        if(this.props.post)
            this.state = {...this.state, ...this.props.post}
    }

    componentWillMount () {
        this.props.getPostById(this.props.match.params.postId)
    }

    openPostModal = () => this.setState(() => ({ showPostModal: true }))
    closePostModal = () => this.setState(() => ({ showPostModal: false }))

    goBack = () => this.props.history.push('/')

    delete = () => this.props.deletePost(this.props.post.id).then(this.goBack)
    
    changeVote = option => this.props.changeVotePost(this.props.match.params.postId, option)

    render() {
        const { post } = this.props
        const { showPostModal } = this.state

        return (
            <div className="view-container">
                <header className="view-header">
                    <h2>Post Details</h2>
                </header>
                {post && 
                    <div className="post-item details">
                        <div className="category"><span>{post.category.toUpperCase()}</span></div>
                        <header className="post-item-header">
                            <div className="title">
                                <h4>{post.title}</h4>
                                <div>
                                    <IconButton className="icon-button" 
                                                tooltip="Delete"
                                                onClick={() => this.openPostModal()}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton className="icon-button" 
                                                tooltip="Delete"
                                                onClick={() => this.delete(post.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                                
                            </div>
                            <div className="author">
                                <span>
                                    By <span className="author-name">{post.author}</span> 
                                    ({new Date(post.timestamp).toLocaleString()})
                                </span>
                            </div>              
                        </header>
                        <div className="post-item-body">{post.body}</div>
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
                            <Tooltip title="Comments">
                                <div className="comments">
                                    <span>{post.commentCount}</span>
                                    <Icon>comment</Icon>
                                </div>
                            </Tooltip>
                        </footer>

                        <CommentList postId={post.id} />

                        <Dialog open={showPostModal}>
                            <DialogTitle>Edit Post</DialogTitle>
                            <PostModal post={post} closeModal={this.closePostModal} />
                        </Dialog>                        
                    </div>
                }                
            </div>                      
        )
    }
}

const mapStateToProps = ({ posts }) => ({ post: posts[0] })

const mapDispatchToProps = dispatch => ({
    getPostById: postId => dispatch(getPostById(postId)),
    deletePost: postId => dispatch(deletePost(postId)),
    changeVotePost: (post, option) => dispatch(changeVotePost(post, option)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails)