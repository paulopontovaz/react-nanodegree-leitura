import '../assets/App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { getAllCategories } from '../actions/categories'
import Category from './Category'

class App extends Component {
  componentDidMount() {
    this.props.getAllCategories()
  }

  render() {
    // const { categories } = this.state

    return (
      <div className="app">
        <header className="title">
          <h3>Readable</h3>
        </header>
        
        <main>
          <nav>
            <ul>
              {
              //   this.props.categories.map((category) => {
              //   <li key={category.name}>
              //     <Link to={`/${category.path}`}>
              //       {category.name.toUpperCase()}
              //     </Link>
              //   </li>               
              // })
            }
            </ul>            
          </nav>          
          
          {
          //   this.props.categories.map((category) => {
          //   <Route exact path={`/${category.path}`}
          //           key={category.name}
          //           render={() => (
          //             <Category categoryName={category.name.toUpperCase()} />
          //       )} />
          // })
          }
        </main>

        <footer>
          <span>Readable, Nanodegree React Project. By Paulo Vaz.</span>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories())
  }
}

export default connect(
  null,//mapStateToProps, 
  mapDispatchToProps
)(App)