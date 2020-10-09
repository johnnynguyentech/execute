import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Execute from './containers/Execute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Execute />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
