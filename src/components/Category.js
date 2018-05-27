import '../assets/View.css'
import React from 'react'
import PropTypes from 'prop-types'
import PostList from './Posts/PostList'

const Category = props => {
  const { category } = props

  /*
    Componente básico para exibição da casca de cada view de categoria.
    Exibe somente o título da categoria e uma referência ao "PostList".
  */
  return (
    <div className="view-container">
      <header className="view-header">
        <h2>{category.name.toUpperCase()}</h2>
      </header>
      <PostList categoryPath={category.path} />
    </div>
  )
}

//Certificando que as devidas propriedades estejam presentes e no formato certo
Category.propTypes = {
  category: PropTypes.object.isRequired,
}

export default Category