import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import TodosPage from './TodosPage';
import './App.css';

const TOKEN = 'TOKEN';

export default class App extends Component {
  state = {
    token: localStorage.getItem(TOKEN)
  }

  login = (userToken) => {
    this.setState({ token: userToken })
    localStorage.setItem(TOKEN, userToken)
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
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
            <Link to='/todos'>To-Do's</Link>
            <button onClick={this.logout}>Logout</button>
          </div>
          <Switch>
            <Route
              path='/'
              exact
              render={(routerProps) => <HomePage {...routerProps} />}
            />
            <Route
              path='/login'
              exact
              render={(routerProps) => <LoginPage login={this.login} {...routerProps} />}
            />
            <Route
              path='/signup'
              exact
              render={(routerProps) => <SignupPage login={this.login} {...routerProps} />}
            />
            <Route
              path='/todos'
              exact
              render={(routerProps) =>
                this.state.token
                  ? <TodosPage {...routerProps} token={this.state.token} />
                  : <Redirect to='/' />
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}