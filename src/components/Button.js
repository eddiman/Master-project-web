import React from 'react';
import styled from 'styled-components';
import {constants} from '../theme/theme';
import { Link } from 'react-router-dom'



const ButtonStyle = styled.div` 
    border-radius: 2px;
    box-shadow: ${constants.boxShadowsValues};
    background-color: ${props => props.color};
    max-width: 100px;
    height: 32px;
    text-align: center;
    color: ${props => props.fontColor};
    letter-spacing: .5;
    text-transform: uppercase;
    padding: 0 1rem;
    vertical-align: middle;
    line-height: 32px;
    font-weight: 400;
    transition: box-shadow .2s, opacity .2s;
        ${ButtonStyle}:hover {
        box-shadow: ${constants.boxShadowsValuesHover};
        opacity: 0.8;
         }
    
`;



class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            link: props.link,
            text: props.text,
            fontColor: props.fontColor,
            darkerColor: props.darkerColor,
        }

    }

    render() {
        const {color, darkerColor, fontColor, link, text} = this.state;
        return(
        <Link to={link }>
            <ButtonStyle color={color} darkerColor={darkerColor} fontColor={fontColor}>
                {text}
            </ButtonStyle>

        </Link>
        )
    }
}

export default Button;


