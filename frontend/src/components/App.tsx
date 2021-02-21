import React from 'react';
import '../css/App.css';
import AuthPage from './AuthPage'
import HomePage from './HomePage'
import {BrowserRouter, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import store from '../store'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute path='/' exact component={HomePage}/>
          <Route path='/auth' exact component={AuthPage}/>
        </BrowserRouter>
      </Provider>
      
    </div>
  );
}

export default App;
