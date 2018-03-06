import React from 'react';
import styled from 'styled-components';
import {constants} from "../theme/theme";


function getWidthString(span) {
    if (!span) return;

    let width = span / 12 * 100;
    return `width: ${width}%`;
}

function getMarginString(offset) {
    if (!offset) return;

    let marginLeft = offset / 12 * 100;
    return `margin-left: ${marginLeft}%`;
}

export const Column = styled.div`
    float: left;
    margin: 8px;
    
    @media (max-width: 996px) {
        ${({xs}) => (xs ? getWidthString(xs) : `width: calc(100% - ${constants.standardMargin} - ${constants.standardMargin} )`)};
        ${({offsetXs}) => offsetXs && getMarginString(offsetXs) };
}

    
        @media (min-width: 996px) {
        ${({lg}) => lg && getWidthString(lg)};
        ${({offsetLg}) => offsetLg && getMarginString(offsetLg) };

    }
`;
