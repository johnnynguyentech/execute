import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Execute.css';

import Home from './Home/Home';
import Todo from './Todo/Todo';
import ScrollToTop from '../hoc/ScrollToTop/ScrollToTop';


class Lash extends Component {
    render () {
        return (
            <div className="Execute">
                <ScrollToTop>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/todo" exact component={Todo} />
                        <Route render={() => <center><h1 id="error">404 Not Found</h1></center>} />
                    </Switch>
                </ScrollToTop>
            </div>
        );
    }
}

export default Lash;