import React, { Component } from 'react';
import './styles/App.scss';
import Header from './components/Header.js';
import  { ThemeProvider } from 'styled-components';
import {Row} from './components/Row';
import colors from './theme/colors';
import AllSessions from './containers/AllSessions'
import Main from './routes/Main'


class App extends Component {

    render() {
        return (
            <ThemeProvider theme={colors}>

                <div className="App">
                    <Header/>
                    <Row className="row">
                        <Main/>
                    </Row>

                </div>
            </ThemeProvider>
        );
    }
}

export default App;
