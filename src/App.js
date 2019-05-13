import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormComp from './components/Form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            Linking Node Js to react front end
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <FormComp/>
      </div>
    );
  }
}

export default App;
