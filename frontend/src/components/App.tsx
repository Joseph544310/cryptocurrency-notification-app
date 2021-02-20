import React from 'react';
import '../css/App.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>
      <LoginForm/>
      <RegisterForm/>
    </div>
  );
}

export default App;
