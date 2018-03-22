import '../assets/Category.css';
import React, { Component } from 'react'

class Category extends Component {

  render() {
    const { categoryName } = this.props
    return (
      <div className="category-container">
      	<h2>{categoryName}</h2>
      	<form>
      		<textarea>
      			
      		</textarea>
      		<div className="form-footer"></div>
      	</form>
      </div>
    )    
  }
}

export default Category