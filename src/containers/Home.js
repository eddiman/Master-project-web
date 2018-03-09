import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import {Row} from "../components/Row";
import { Link } from 'react-router-dom'
import logo from "../res/img/logo_fire_tracker.png"
import Styled from "styled-components";


class Home extends React.Component {

    render(){

        const HeaderImg = Styled.img`
        height: 150px;
        margin-left:10%
    `;
        return(
            <Row>
                <Column offsetLg="2"  xs ="11"  lg="8">
                    <CardOuter>
                        <Row>
                            <Column offsetLg="2"  xs ="12"  lg="8">

                                <HeaderImg src ={logo}/>

                                <Row>
                                    <Column  xs ="11"  lg="12">
                                        <CardOuter>
                                            <Link to='/session'>
                                                <h1>
                                                    Open session...
                                                </h1>
                                            </Link>
                                        </CardOuter>

                                        <CardOuter>
                                            <Link to='/'>
                                                <h1>
                                                    Create a session...
                                                </h1>
                                            </Link>
                                        </CardOuter>

                                    </Column>
                                </Row>

                            </Column>
                        </Row>
                    </CardOuter>
                </Column>
            </Row>
        )
    }
}

export default Home;