import React from 'react';
import './App.css';
import CanvasB from '@comp/CanvasB.js'
import Content from '@src/modules/index/index'

class App extends React.Component {
  render() {
    return (
      <div  className='wrap-App'>
           <CanvasB/>
           <Content/>
      </div>
    );
  }
} 

export default App;
