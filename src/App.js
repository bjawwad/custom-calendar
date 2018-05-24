import React, { Component } from 'react';
import './App.css';

import Calender from "./calender/Calender";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              react<b>calender</b>
            </span>
          </div>
        </header>
        <main>
          <Calender />
        </main>
      </div>
    );
  }
}

export default App;
