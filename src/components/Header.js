import React from 'react';
import Styled from 'styled-components';
import theme, {constants} from '../theme/theme';



const StatusBar = Styled.div`
            height: 16px;
            background-color: ${theme.colorPrimaryDark};
`;
const ToolBar = Styled.div`
            background-color: ${theme.colorPrimary};
            height: 42px;
            box-shadow: ${constants.boxShadowsValues};
    `;
const Title = Styled.h1`
        color: white;
        margin: 0 0 0 8%;
        padding: 0;
        
    `;


class Header extends React.Component {

    render(){
        return(
            <header>
                <StatusBar/>
                <ToolBar>
                    <Title>FireTracker</Title>
                </ToolBar>

            </header>
        )

    }


}

export default Header;