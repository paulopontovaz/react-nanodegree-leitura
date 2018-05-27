import '../../assets/CommentList.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCommentsByPostId, changeCommentOrder } from '../../actions/comments'
import Button from '@material-ui/core/Button'
import CommentModal from './CommentModal'
import CommentItem from './CommentItem'
import Dialog from '@material-ui/core/Dialog'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class CommentList extends Component {
    state = {
        showCommentModal: false,
        modalComment: null,
        order: 'voteScore',
        ascending: false,
    }

    componentWillMount () {
        this.props.getCommentsByPostId(this.props.postId)
    }

    openCommentModal = (comment = null) => this.setState({ showCommentModal: true, modalComment: comment })
    closeCommentModal = () => this.setState({ showCommentModal: false, modalComment: null })

    changeOrder (newOrder, ascending) {
        this.props.changeOrder(newOrder, ascending)
        this.setState({order: newOrder})
    }

    toggleAscending (newOrder, ascending) {
        this.props.changeOrder(newOrder, ascending)
        this.setState({ ascending: ascending })
    }

    render() {
        const { comments, postId } = this.props
        const { showCommentModal, modalComment, order, ascending } = this.state

        return (
            <div className="comment-list">
                {comments && (
                    <div>
                        <header>
                            <h4>
                                <Tooltip title="Comments">
                                    <div className="comments">
                                        <Icon>comment</Icon>
                                    </div>
                                </Tooltip>
                                <span>Comments ({comments.length})</span>
                            </h4>
                            <Button
                                className="new-comment"
                                color="primary"
                                variant="outlined"
                                onClick={() => this.openCommentModal()}>NEW COMMENT</Button>
                        </header>
                        <FormControl fullWidth={true} className='modal-form-field'>
                            <InputLabel htmlFor="post-order">Order by</InputLabel>
                            <Select
                                inputProps={{name: 'post-order', id: 'post-order'}}
                                value={order}
                                onChange={event => this.changeOrder(event.target.value, ascending)}>
                                <MenuItem value='voteScore'>Vote Score</MenuItem>
                                <MenuItem value='timestamp'>Date</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            label="Order crescente"
                            control={
                                <Checkbox
                                    checked={ascending}
                                    onChange={(event, checked) => this.toggleAscending(order, checked)}
                                    value='ascending'
                                />
                            }/>
                        
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
    changeOrder: (newOrder, ascending) => dispatch(changeCommentOrder(newOrder, ascending)),
})

CommentList.propTypes = {
    getCommentsByPostId: PropTypes.func.isRequired,
    changeOrder: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList)