import '../assets/App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Loading from 'react-loading'
import {Tabs, Tab} from 'material-ui/Tabs'
import { getAllCategories } from '../actions/categories'
import Category from './Category'

class App extends Component {  
  state = {
    selectedCategory: null,//used for applying some CSS classes
  }
  
  componentDidMount() {
    this.props.loadCategories()
  }

  selectCategory = (category) => this.setState(() => ({ selectedCategory: category }))

  render() {
    let { selectedCategory } = this.state
    let categories = []

    if (this.props.categories) {
      categories = [{name:'home', path:''}].concat(this.props.categories)

      if (selectedCategory === null)
        selectedCategory = categories[0]
    }    

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
                  <li key={category.name}                      
                      className={ selectedCategory && 
                        selectedCategory.name === category.name ? 'selected-category' : '' }>
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

const mapStateToProps = state => ({ categories: state.categories })

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(getAllCategories())
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)