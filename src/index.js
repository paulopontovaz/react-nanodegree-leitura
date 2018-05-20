import './assets/index.css'
import './assets/Modal.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import registerServiceWorker from './utils/registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/App'
import reducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(thunk)
	)	
)

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
				
	</Provider>, 
	document.getElementById('root'))
registerServiceWorker()