import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Home.css';
import Aux from '../../hoc/Aux/Aux';

class Home extends Component {
    state = {
        signingUp: false
    }

    onSignHandler = () => {
        if(this.state.signingUp) {
            this.setState({signingUp: false});
        }else{
            this.setState({signingUp: true});
        }
    }

    render () {
        let signOrLog = (
        <Aux>
            <h3 id="sign">SIGN UP</h3>
            <center><p onClick={this.onSignHandler}>Already have an account? Click to log in.</p></center>
        </Aux>
        );
        if (!this.state.signingUp) {
            signOrLog = (
                <Aux>
                    <h3 id="sign">LOG IN</h3>
                    <center><p onClick={this.onSignHandler}>Don't have an account? Click to sign up.</p></center>
                </Aux>
                );
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
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address:</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password:</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                            </div>
                            <NavLink to='/todo'><button type="submit" className="btn btn-primary" id="submitLogin">Submit</button></NavLink>
                        </form>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Home;