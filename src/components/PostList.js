import '../assets/PostList.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import Button from '@material-ui/core/Button'
import PostItem from './PostItem'
import PostModal from './PostModal'
import Dialog from '@material-ui/core/Dialog'

class PostList extends Component {
  state = {
    showPostModal: false,
    modalPost: null
  }

  openPostModal = (post = null) => this.setState(() => ({ showPostModal: true, modalPost: post }))
  closePostModal = () => this.setState(() => ({ showPostModal: false, modalPost: null }))

  componentDidMount() {
    this.props.loadPosts(this.props.categoryPath)
  }

  render() {
    const { categoryPath, posts } = this.props
    const { showPostModal, modalPost } = this.state

    return (
      <div className="post-list">
        <Button
          className="new-post"
          color="primary"
          variant="raised"
          fullWidth={true}
          onClick={() => this.openPostModal()}>NEW POST</Button>
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
  loadPosts: categoryPath => dispatch(getPosts(categoryPath))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)