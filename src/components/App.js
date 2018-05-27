import '../assets/App.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import { getAllCategories } from '../actions/categories'
import Category from './Category'
import PostDetails from './Posts/PostDetails'

class App extends Component {
  //Carregando a lista de categorias depois que o componente estiver montado
  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    let categories = []

    //Preparando a lista de categorias com a "Home" inserida na primeira posição.
    //As demais virão do servidor.
    if (this.props.categories)
      categories = [{name:'home', path:''}].concat(this.props.categories)

    /*
      O componente exibe as views de categorias e as views de detalhes cada post.
      A view "Home" é a view padrão (root), tratada como uma das categorias.
      O gerenciamento de mudança de página está sendo feito pelo "BrowserRouter".
    */
    return (
      <div className="app">
        <header className="title">
          <h3>Readable</h3>
        </header>
        
        <BrowserRouter>
          <main>
            <nav>
              <ul>
                {categories && categories.map((category) => (                  
                  <li key={category.name}>
                      <Link to={`/${category.path}`} >
                        {category.name.toUpperCase()}
                      </Link>
                  </li>
                ))}
              </ul>
            </nav>          
            
            <div className="main-container">
              {categories && categories.map((category) => (
                <Route exact path={`/${category.path}`}
                        key={category.name}
                        render={() => (
                          <Category category={category} />
                    )} />
              ))}
              <Route exact path='/posts/:postId' component={PostDetails} />
            </div>
          </main>
        </BrowserRouter>        

        <footer>
          <span>Readable, Nanodegree React Project. By Paulo Vaz.</span>
        </footer>
      </div>
    )
  }
}

//Certificando que as devidas propriedades estejam presentes e no formato certo
App.propTypes = {
  categories: PropTypes.array.isRequired,
  loadCategories: PropTypes.func.isRequired
}

//Mapeando as categorias vindas do reducer correspondente
const mapStateToProps = ({ categories }) => ({ categories })

/* Mapeando a função que chamará o action creator de 
categorias para as propriedades do componente principal */
const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(getAllCategories())
})

//Enviando os mapeamentos para propriedades, com o "connect"
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)