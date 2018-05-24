import '../assets/PostList.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts, changePostOrder } from '../actions/posts'
import Button from '@material-ui/core/Button'
import PostItem from './PostItem'
import PostModal from './PostModal'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class PostList extends Component {
  state = {
    showPostModal: false,
    modalPost: null,
    order: 'voteScore',
    ascending: false,
  }

  openPostModal = (post = null) => this.setState(() => ({ showPostModal: true, modalPost: post }))
  closePostModal = () => this.setState(() => ({ showPostModal: false, modalPost: null }))

  componentDidMount() {
    this.props.loadPosts(this.props.categoryPath)
  }

  changeOrder (newOrder, ascending) {
    this.props.changeOrder(newOrder, ascending)
    this.setState({order: newOrder})
  }

  toggleAscending (newOrder, ascending) {
    this.props.changeOrder(newOrder, ascending)
    this.setState({ ascending: ascending })
  }

  render() {
    const { categoryPath, posts } = this.props
    const { showPostModal, modalPost, order, ascending } = this.state

    return (
      <div className="post-list">
        <Button
          className="new-post"
          color="primary"
          variant="raised"
          fullWidth={true}
          onClick={() => this.openPostModal()}>NEW POST</Button>
        <FormControl fullWidth={true} className='modal-form-field'>
          <InputLabel htmlFor="post-order">Order by</InputLabel>
          <Select
            inputProps={{name: 'post-order', id: 'post-order'}}
            value={order}
            onChange={event => this.changeOrder(event.target.value, ascending)}>
              <MenuItem value='voteScore'>Vote Score</MenuItem>
              <MenuItem value='commentCount'>Comment Count</MenuItem>
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
        {posts && posts.map(post => (
          <PostItem key={post.id} post={post} isHome={!categoryPath} editFunction={this.openPostModal} />
        ))}
        {(!posts || posts.length === 0) && (<div><br/><p>No post found</p></div>)}
        
        <Dialog
          title="Post"
          open={showPostModal}>
            <PostModal 
              post={modalPost || (categoryPath ? {category: categoryPath} : null)} 
              closeModal={this.closePostModal} />
        </Dialog>
      </div>
    )    
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

const mapDispatchToProps = dispatch => ({
  loadPosts: categoryPath => dispatch(getPosts(categoryPath)),
  changeOrder: (newOrder, ascending) => dispatch(changePostOrder(newOrder, ascending)),
})

PostList.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  changeOrder: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  categoryPath: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)