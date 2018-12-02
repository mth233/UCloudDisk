import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import MyHeader from './common/header';
import Carousel from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
import store from './store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<MyHeader/>
						<Route path='/' exact component={Carousel}/>
						<Route path='/login' exact component={Login}/>
						<Route path='/write' exact component={Write}/>
						<Route path='/detail/:id' exact component={Detail}/>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
