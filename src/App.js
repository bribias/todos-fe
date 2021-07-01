import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import TodosPage from './TodosPage';
import './App.css';

export default class App extends Component {
  state = {
    token: localStorage.getItem(TOKEN_KEY)
  }

  longin = () => {
    this.setState({ token: userToken })
    localStorage.setItem(TOKEN_KEY, userToken)
  }

  logout = () => {
    this.setState({ token: '' })
    localStorage.setItem('TOKEN', '')
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <link to='/'>Home</link>
            <link to='/login'>Login</link>
            <link to='/signup'>Signup</link>
            <link to='/todos'>To-Do's</link>
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>
      </Router>
    )
  }
}