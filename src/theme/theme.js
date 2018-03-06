import createTheme from 'styled-components-theme';
import Styled from 'styled-components';
import colors from './colors';

const theme = createTheme(...Object.keys(colors));


export const constants = {
    boxShadowsValues : '0 2px 5px 0 rgba(0,0,0,0.04), 0 2px 10px 0 rgba(0,0,0,0.02)',
    cardBorderRadius : '3px',
    standardMargin : '16px'
};

export const Row = Styled.div`
    display: flex;
    
        @media (max-width: 768px) {
        flex-direction: column;
}
`;

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

export const Column = Styled.div`
    float: left;
    margin: 8px;
    
        ${({xs}) => (xs ? getWidthString(xs) : `width: calc(100% - ${constants.standardMargin} )`)};
        ${({offsetXs}) => offsetXs && getMarginString(offsetXs) };

   
   
    @media (min-width: 768px) {
        ${({sm}) => sm && getWidthString(sm)  };
        ${({offsetSm}) => offsetSm && getMarginString(offsetSm) };
    }
    
        @media (min-width: 992px) {
        ${({md}) => md && getWidthString(md)};
        ${({offsetMd}) => offsetMd && getMarginString(offsetMd) };

    }
    
        @media (min-width: 1200px) {
        ${({lg}) => lg && getWidthString(lg)};
        ${({offsetLg}) => offsetLg && getMarginString(offsetLg) };

    }
`;


export default theme
