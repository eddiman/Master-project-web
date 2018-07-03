import React from 'react';
import Styled from 'styled-components';
import theme, {constants} from '../theme/theme';
import logo from "../res/img/logo_fire_tracker_white_horiz.png"
import { Link } from 'react-router-dom'



const StatusBar = Styled.div`
            height: 16px;
            background-color: ${theme.colorPrimaryDark};
`;
const ToolBar = Styled.div`
            background-color: ${theme.colorPrimary};
            height: 67px;
            
    `;
const TitleImg = Styled.img`
        margin: 0 0 0 8%;
        padding: 0;
        height:36px;
        
    `;


class Header extends React.Component {

    render(){
        return(
            <header>
                <StatusBar/>
                <ToolBar>
                    <Link to='/'>
                    <TitleImg src={logo}/>
                    </Link>
                </ToolBar>

            </header>
        )

    }


}

export default Header;