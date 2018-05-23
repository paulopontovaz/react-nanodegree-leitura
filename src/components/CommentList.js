import '../assets/CommentList.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCommentsByPostId } from '../actions/comments'
import Button from '@material-ui/core/Button'
import CommentModal from './CommentModal'
import CommentItem from './CommentItem'
import Dialog from '@material-ui/core/Dialog'

class CommentList extends Component {
    state = {
        showCommentModal: false,
        modalComment: null,
    }

    componentWillMount () {
        this.props.getCommentsByPostId(this.props.postId)
    }

    openCommentModal = (comment = null) => this.setState(() => ({ showCommentModal: true, modalComment: comment }))
    closeCommentModal = () => this.setState(() => ({ showCommentModal: false, modalComment: null }))

    render() {
        const { comments, postId } = this.props
        const { showCommentModal, modalComment } = this.state

        return (
            <div className="comment-list">
                {comments && (
                    <div>
                        <header>
                            <h4>Comments ({comments.length})</h4>
                            <Button
                                className="new-comment"
                                color="primary"
                                variant="outlined"
                                onClick={() => this.openCommentModal()}>NEW COMMENT</Button>
                        </header>
                        
                        {comments.map(comment => (
                            <CommentItem key={comment.id} comment={comment} editFunction={this.openCommentModal} />
                        ))}
                    </div>                
                )}
                {(!comments || comments.length === 0) && (<div><br/><p>No comment found</p></div>)}

                <Dialog
                    title="Add Comment"
                    open={showCommentModal}>
                        <CommentModal 
                            comment={modalComment || { parentId: postId } }                             
                            closeModal={this.closeCommentModal} />
                </Dialog>
            </div>           
        )
    }
}

const mapStateToProps = ({ comments }) => ({ comments })

const mapDispatchToProps = dispatch => ({
    getCommentsByPostId: postId => dispatch(getCommentsByPostId(postId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList)