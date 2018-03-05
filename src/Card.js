import React from 'react';
import Styled from 'styled-components';
import theme, {constants} from './theme/theme';

const CardOuter = Styled.div`
    background-color: ${theme.appWhite};
    border-radius: ${constants.cardBorderRadius};
    box-shadow: ${constants.boxShadowsValues};
    height: 400px;
    width: 600px;
    margin: 64px;
`;

const DarkBar = Styled.div`
    width: 100%;
    height: 12px;
    background-color: ${theme.colorPrimaryDark};
    border-radius: 3px 3px 0 0;

`;
const TitleBar = Styled.div`
    width: 100%;
    height: 32px;
    background-color: ${theme.colorPrimary};
    box-shadow: ${constants.boxShadowsValues};

`;


class Card extends React.Component {

    render(){
        return(
            <CardOuter>
                <DarkBar/>
                <TitleBar/>

            </CardOuter>
        )
    }
}

export default Card;