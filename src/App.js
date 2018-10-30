import React, { Component } from 'react';
import './App.css';
import svg from './App.svg'


class App extends Component {
  render() {
    return (
      <div  className='wrap-App'>
           <img src={svg} alt="logo" width='300' height='300'/>
           <img src={svg} alt=""  width='300' height='300'/>
      </div>
    );
  }
}

export default App;
