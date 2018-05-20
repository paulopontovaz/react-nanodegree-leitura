import '../assets/Category.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import RaisedButton from 'material-ui/RaisedButton'
import PostItem from './PostItem'
import PostModal from './PostModal'
import Dialog from 'material-ui/Dialog'

class Category extends Component {
  state = {
    postModalOpen: false,
    modalPost: null
  }

  openPostModal = (post = null) => this.setState(() => ({ postModalOpen: true, modalPost: post }))
  closePostModal = () => this.setState(() => ({ postModalOpen: false, modalPost: null }))

  componentDidMount() {
    this.props.loadPosts(this.props.category.path)
  }

  render() {
    const { category, posts } = this.props
    const { postModalOpen, modalPost } = this.state

    return (
      <div className="category-container">
        <header className="category-header">
          <h2>{category.name.toUpperCase()}</h2>
          <RaisedButton label="POST" onClick={() => this.openPostModal()} />
        </header>
      	<div className="post-list">
          {posts && posts.map(post => (
            <PostItem key={post.id} post={post} isHome={!category.path} editFunction={this.openPostModal} />
          ))}
          {(!posts || posts.length === 0) && (<div><br/><p>No post found</p></div>)}
        </div>

        <Dialog
          title="Post"
          open={postModalOpen}
          autoScrollBodyContent={true}>
            <PostModal post={modalPost} closeModal={this.closePostModal} />
        </Dialog>
      </div>
    )    
  }
}

const mapStateToProps = state => ({ posts: state.posts })

const mapDispatchToProps = dispatch => ({
  loadPosts: categoryPath => dispatch(getPosts(categoryPath))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)