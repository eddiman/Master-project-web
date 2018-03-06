import React from 'react';
import Styled from 'styled-components';
import theme, {constants} from '../theme/theme';


const StatusBar = Styled.div`
            height: 16px;
            background-color: ${theme.colorPrimaryDark};
`;
const ToolBar = Styled.div`
            background-color: ${theme.colorPrimary};
            height: 40px;
            box-shadow: ${constants.boxShadowsValues};
    `;



class Header extends React.Component {

    render(){
        return(
            <header>
                <StatusBar/>
                <ToolBar/>


            </header>
        )

    }


}

export default Header;