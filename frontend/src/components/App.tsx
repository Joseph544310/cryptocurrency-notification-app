import React from 'react';
import '../css/App.css';
import AuthPage from './AuthPage'
import HomePage from './HomePage'
import {BrowserRouter, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/auth' component={AuthPage}/>
        <ProtectedRoute path='/' exact component={HomePage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
