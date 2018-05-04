import React from 'react';
import styled from 'styled-components';
import theme, {constants} from '../theme/theme';



const TitleBar = styled.div`
    width: 100%;
    height: 48px;
    background-color: ${theme.colorPrimary};
    box-shadow: ${constants.boxShadowsValues};
    border-radius: 6px 6px 0 0;

        h2 {
        margin: 0;
        color:white;
        padding:1% 0 0 3%;
        font-size: 1.3em;
        }
        
`;

const CardTitle = styled.h1`
        margin: 0;
        text-indent: 1em;
        color: #fff;
    `;


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flexDirection : '',
            titleText : '',
            flex: '',
            children : this.props.children,
            class : this.props.class
        };
    }


    render(){
        const CardOuter = styled.div`
            background-color: ${theme.appWhite};
            border-radius: ${constants.cardBorderRadius};
            box-shadow: ${constants.boxShadowsValues};
            padding-bottom: ${constants.standardMargin};
            transition: box-shadow .2s, transform .2s;
            margin:16px;
            
            z-index: 0;
            opacity: 1;
            animation-name: fadeInOpacity;
            animation-iteration-count: 1;
            animation-timing-function: ease-in;
            animation-duration: .2s;
            
            flex: ${this.props.flex ? this.props.flex : '0'}
            display:flex;
            flex-direction: ${this.props.flexDirection ? this.props.flexDirection : 'row'};
           
}
`;
        return(
            <CardOuter className ={this.state.class}>
                <TitleBar>
                    <CardTitle>
                        {this.props.titleText}
                    </CardTitle>
                </TitleBar>
                {this.props.children}
            </CardOuter>
        )
    }
}
export default Card;


