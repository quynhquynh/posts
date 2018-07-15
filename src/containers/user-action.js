import React from 'react'
import { connect } from 'react-redux'
import { signup, login, logout } from '../actions'

class UserAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedup: false,
      isLoggedin: false,
      signup_user: {
        username: '',
        password: ''
      },
      login_user: {
        username: '',
        password: ''
      }
    }
  }

  handleUser = action => {
    this.setState(prevState => ({
      isSignedup: action === 'signup' ? !prevState.isSignedup : prevState.isSignedup,
      isLoggedin: action === 'login' ? !prevState.isLoggedin : prevState.isLoggedin
    }))
  }

  handleChange = (e, action, type = '') => {
    if (action === 'signup') {
      let copy_signup = { ...this.state.signup_user }
      copy_signup[type] = e.target.value
      this.setState({ signup_user: copy_signup })
    }
    if (action === 'login') {
      let copy_login = { ...this.state.login_user }
      copy_login[type] = e.target.value
      this.setState({ login_user: copy_login })
    }
    if (action === 'sort') {
      this.setState({ sortType: e.target.value })
    }
  }

  handleSubmit = (e, action) => {
    e.preventDefault()
    if (action === 'signup') {
      this.props.signup(this.state.signup_user, () => {
        this.setState({
          isSignedup: false,
          isLoggedin: true
        })
      })
    } else {
      this.props.login(this.state.login_user, () => {
        this.setState({
          isLoggedin: false
        })
      })
    }
  }

  validate = () => {
    const up = this.props.signup_u
    const { username, password } = this.state.login_user
    const errors = {
      username: up.findIndex(u => u.username === username) !== -1 ? '' : 'username not matched',
      password: up.findIndex(u => u.password === password) !== -1 ? '' : 'password not matched'
    }
    return errors
  }

  isSubmitDisabled = errors => !Object.values(errors).every(err => !err)

  render() {
    let { login_u } = this.props
    let { isSignedup, isLoggedin, signup_user, login_user } = this.state
    const errors = this.validate()
    const renderSignup = () => {
      return (
        <form id="signup" onSubmit={e => this.handleSubmit(e, 'signup')}>
          <h4>Welcome to sign-up page</h4>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={signup_user.username}
              onChange={e => this.handleChange(e, 'signup', 'username')}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={signup_user.password}
              onChange={e => this.handleChange(e, 'signup', 'password')}
            />
          </div>
          <button type="submit">Sign-up</button>
          <button onClick={() => this.handleUser('signup')}>Cancel</button>
        </form>
      )
    }

    const renderLogin = () => {
      return (
        <form id="login" onSubmit={e => this.handleSubmit(e, 'login')}>
          <h4>Welcome to login page</h4>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={login_user.username}
              onChange={e => this.handleChange(e, 'login', 'username')}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={login_user.password}
              onChange={e => this.handleChange(e, 'login', 'password')}
            />
          </div>
          <button type="submit" disabled={this.isSubmitDisabled(errors)}>
            Login
          </button>
          <button onClick={() => this.handleUser('login')}>Cancel</button>
        </form>
      )
    }

    return (
      <div>
        <div id="user">
          <button onClick={() => this.handleUser('signup')}>Sign up</button>
          {Object.keys(login_u).length ? (
            <button id="logout" onClick={this.props.logout}>
              Logout
            </button>
          ) : (
            <button onClick={() => this.handleUser('login')}>Login</button>
          )}
        </div>
        {isSignedup && renderSignup()}
        {isLoggedin && renderLogin()}
      </div>
    )
  }
}

const mapStateToProps = ({ signup, login }) => {
  return {
    login_u: login,
    signup_u: signup
  }
}

export default connect(
  mapStateToProps,
  { signup, login, logout }
)(UserAction)
