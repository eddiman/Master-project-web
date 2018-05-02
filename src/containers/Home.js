import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../res/img/logo_fire_tracker.png"
import Styled from "styled-components";
import Card from "../components/Card";


class Home extends React.Component {

    render(){

        const HeaderImg = Styled.img`
        max-width: 300px;
        justify-content: center;
        align-self: center;
    `;


        return(
            <div className="container flex-container-center">
                <Card titleText=" Home" flexDirection="column" >

                    <HeaderImg src ={logo}/>

                        <Link to='/session'>
                            <h1> Open session</h1>
                        </Link>

                    <Link to='/create-session'>
                        <h1> Create a session</h1>

                    </Link>

                </Card>

            </div>
        )
    }
}

export default Home;