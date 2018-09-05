import React from 'react';
import styled from 'styled-components';
import {constants} from '../theme/theme';
import { Link } from 'react-router-dom'



const ButtonStyle = styled.button` 
    border-radius: 2px;
    box-shadow: ${constants.boxShadowsValues};
    background-color: ${props => props.color};
    max-width: 100px;
    height: 32px;
    text-align: center;
    letter-spacing: .5;
    color: ${props => props.fontColor} ;
    text-transform: uppercase;
    padding: 0 1rem;
    font-weight: 600;

    vertical-align: middle;
    line-height: 32px;
    
    transition: box-shadow .2s, opacity .2s;
    cursor: pointer;
        ${ButtonStyle}:hover {
        box-shadow: ${constants.boxShadowsValuesHover};
        opacity: 0.8;
         }
         
        a {
         }
    
`;



class LinkButton extends React.Component {

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
            <Link to={link}>
                <div className="create-session-btn">
                    {text}
                </div>
            </Link>

        )
    }
}

export default LinkButton;


