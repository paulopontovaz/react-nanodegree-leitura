import '../assets/Category.css';
import React, { Component } from 'react'

class Category extends Component {

  render() {
    const { categoryName } = this.props
    return (
      <span>{categoryName}</span>
    )    
  }
}

export default Category