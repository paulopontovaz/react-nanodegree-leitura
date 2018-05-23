import '../assets/View.css'
import React, { Component } from 'react'
import PostList from './PostList'

class Category extends Component {
  render() {
    const { category } = this.props

    return (
      <div className="view-container">
        <header className="view-header">
          <h2>{category.name.toUpperCase()}</h2>
        </header>
      	<PostList categoryPath={category.path} />
      </div>
    )    
  }
}

export default Category