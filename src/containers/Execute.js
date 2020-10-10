import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Execute.css';

import Home from './Home/Home';
import Todo from './Todo/Todo';
import Logout from './Logout/Logout';
import ScrollToTop from '../hoc/ScrollToTop/ScrollToTop';

import {connect} from 'react-redux';
import * as actions from '../store/actions';

class Execute extends Component {
    componentDidMount () {
        this.props.onAutoSignUp();
    }

    render () {
        let routes = (
            <ScrollToTop>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route render={() => <center><h1 id="error">404 Not Found</h1></center>} />
                </Switch>
            </ScrollToTop>
        );

        if(this.props.isAuthenticated) {
            routes = (
                <ScrollToTop>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/todo" exact component={Todo} />
                        <Route path="/logout" component={Logout} />
                        <Route render={() => <center><h1 id="error">404 Not Found</h1></center>} />
                    </Switch>
                </ScrollToTop>
            );
        }
        return (
            <div className="Execute">
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAutoSignUp: () => dispatch(actions.authCheckState())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Execute);