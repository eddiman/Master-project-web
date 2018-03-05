import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Card from './Card.js';
import { ThemeProvider } from 'styled-components';
import colors from './theme/colors'



class App extends Component {

  render() {
    return (
        <ThemeProvider theme={colors}>

      <div className="App">

          <Header/>
        <Card/>

      </div>
        </ThemeProvider>
    );
  }
}

export default App;
