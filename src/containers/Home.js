import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import { Link } from 'react-router-dom'

class Home extends React.Component {

    render(){
        return(
            <Column offsetLg="2"  xs ="12"  lg="8">
                <CardOuter>
                    <TitleBar></TitleBar>
                    <h2><Link to='/session'>Click here to start</Link></h2>
                </CardOuter>
            </Column>

        )
    }
}

export default Home;