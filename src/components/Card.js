import React from 'react';
import styled from 'styled-components';
import theme, {constants} from '../theme/theme';

export const CardOuter = styled.div`
    background-color: ${theme.appWhite};
    border-radius: ${constants.cardBorderRadius};
    box-shadow: ${constants.boxShadowsValues};
    width: 100%;
    padding-bottom: ${constants.standardMargin};
    transition: box-shadow .2s, transform .2s;
    margin-top:16px;
    z-index: -2;
    opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: .2s;
    
   /* ${CardOuter}:hover {
        box-shadow: ${constants.boxShadowsValuesHover};
        transform: scale(1.001,1.001);
    }*/
       
    @keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
`;

export const DarkBar = styled.div`
    width: 100%;
    height: 12px;
    background-color: ${theme.colorPrimaryDark};
    border-radius: 3px 3px 0 0;

`;
export const TitleBar = styled.div`
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
