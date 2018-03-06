import React, { Component } from 'react';
import './App.scss';
import Header from './Header.js';
import Card from './Card.js';
import  { ThemeProvider } from 'styled-components';
import {Row, Column} from './theme/theme';
import colors from './theme/colors';



class App extends Component {

    render() {
        return (
            <ThemeProvider theme={colors}>

                <div className="App">
                    <Header/>
                    <Row className="row">
                        <Column offset="1" xs="12" sm="2" md="3" lg="12">
                            <Card />
                        </Column>
                        <Column xs="12" sm="2" md="3" lg="12">
                            <Card />
                        </Column>
                    </Row>



                </div>
            </ThemeProvider>
        );
    }
}

export default App;
