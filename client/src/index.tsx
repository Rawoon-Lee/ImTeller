import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store/store'

function getLibrary(provider) {
	const library = new Web3Provider(provider, 'any')
	return library
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<Web3ReactProvider getLibrary={getLibrary}>
			<App />
		</Web3ReactProvider>
	</Provider>,
)

reportWebVitals()
