import '../assets/App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import { getAllCategories } from '../actions/categories'
import Category from './Category'

class App extends Component {
  state = {
    selectedCategory: null
  }
  
  componentDidMount() {
    this.props.loadCategories()
  }

  selectCategory = (category) => {
    this.setState({ selectedCategory: category.name })
  }

  render() {
    const categories = [{name:'home', path:''}].concat(this.props.categories)

    return (
      <div className="app">
        <header className="title">
          <h3>Readable</h3>
        </header>
        
        <BrowserRouter>
          <main>
            <nav>
              <ul>
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link to={`/${category.path}`}>
                      {category.name.toUpperCase()}
                    </Link>
                  </li>               
                ))}
              </ul>            
            </nav>          
            
            {categories.map((category) => (
              <Route exact path={`/${category.path}`}
                      key={category.name}
                      render={() => (
                        <Category categoryName={category.name.toUpperCase()} />
                  )} />
            ))}
          </main>
        </BrowserRouter>        

        <footer>
          <span>Readable, Nanodegree React Project. By Paulo Vaz.</span>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => ({ 
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(getAllCategories())
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)