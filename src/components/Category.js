import '../assets/View.css'
import React from 'react'
import PropTypes from 'prop-types'
import PostList from './Posts/PostList'

const Category = props => {
  const { category } = props

  return (
    <div className="view-container">
      <header className="view-header">
        <h2>{category.name.toUpperCase()}</h2>
      </header>
      <PostList categoryPath={category.path} />
    </div>
  )
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
}

export default Category