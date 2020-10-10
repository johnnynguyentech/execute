import React, { Component } from 'react';

import './Home.css';
import Aux from '../../hoc/Aux/Aux';

import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class Home extends Component {
    state = {
        email: '',
        password: '',
        isSignUp: false
    }

    onSignHandler = () => {
        if(this.state.isSignUp) {
            this.setState({isSignUp: false});
        }else{
            this.setState({isSignUp: true});
        }
    }

    onChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = () => {
        if (this.state.email.length === 0 || this.state.password === 0) {
          alert('Please fill out the entire form!')
        }
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp)    
    }

    render () {
        // Switch from log in to sign up
        let signOrLog = (
        <Aux>
            <h3 id="sign">SIGN UP</h3>
            <center><p onClick={this.onSignHandler}>Already have an account? Click to log in.</p></center>
        </Aux>
        );
        if (!this.state.isSignUp) {
            signOrLog = (
                <Aux>
                    <h3 id="sign">LOG IN</h3>
                    <center><p onClick={this.onSignHandler}>Don't have an account? Click to sign up.</p></center>
                </Aux>
            );
        }

        // Error in logging in or signing up
        let errorMsg = null;
        if(this.props.error) {
            if(this.props.error.message === 'INVALID_PASSWORD') {
                errorMsg = (
                <div>
                    <p><i className="fas fa-exclamation-circle"></i><strong> Let's try that again</strong></p>
                    <p>The password you entered is incorrect. Try again, or choose another login option.</p>
                </div>
                )
            }
            else if (this.props.error.message === 'EMAIL_NOT_FOUND') {
                errorMsg = (
                <div>
                    <p><i class="fas fa-exclamation-circle"></i><strong> Let's try that again</strong></p>
                    <p>The email you entered is incorrect. Try again, or choose another login option.</p>
                </div>
                )
            }
            else if (this.props.error.message === 'EMAIL_EXISTS') {
                errorMsg = (
                <div>
                    <p><i class="fas fa-exclamation-circle"></i><strong> Let's try that again</strong></p>
                    <p>The email you entered already exists.</p>
                </div>
                )
            }
        } 

        return (
            <Aux>
                <div className="Home"> 
                    <h1 id="name">execute.</h1>
                    <h4 id="bio">A to-do list application to plan, organize, and execute.</h4>
                    
                    
                    {/* LOG IN FORM */}
                    <div className="jumbotron" id="logInForm">
                        <form>
                                {signOrLog}
                                {errorMsg}
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address:</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={(event) => this.onChange(event)}
                                    value={this.state.email}></input>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password:</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={(event) => this.onChange(event)}
                                    value={this.state.password}></input>
                            </div>
                            <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary" id="submitLogin">Submit</button>
                        </form>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
      error: state.error
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  