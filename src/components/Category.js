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
    showPostModal: false,
    modalPost: null
  }

  openPostModal = (post = null) => this.setState(() => ({ showPostModal: true, modalPost: post }))
  closePostModal = () => this.setState(() => ({ showPostModal: false, modalPost: null }))

  componentDidMount() {
    this.props.loadPosts(this.props.category.path)
  }

  render() {
    const { category, posts } = this.props
    const { showPostModal, modalPost } = this.state

    return (
      <div className="category-container">
        <header className="category-header">
          <h2>{category.name.toUpperCase()}</h2>
          <RaisedButton 
            label="POST" 
            primary={true} 
            onClick={() => this.openPostModal()} />
        </header>
      	<div className="post-list">
          {posts && posts.map(post => (
            <PostItem key={post.id} post={post} isHome={!category.path} editFunction={this.openPostModal} />
          ))}
          {(!posts || posts.length === 0) && (<div><br/><p>No post found</p></div>)}
        </div>

        <Dialog
          title="Post"
          open={showPostModal}
          autoScrollBodyContent={true}>
            <PostModal 
              post={modalPost || (category && category.path ? {category: category.name} : null)} 
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
)(Category)