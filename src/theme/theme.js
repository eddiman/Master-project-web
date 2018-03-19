import createTheme from 'styled-components-theme';
import colors from './colors';

const theme = createTheme(...Object.keys(colors));


export const constants = {
    boxShadowsValues : '0 2px 10px 0 rgba(0,0,0,0.15), 0 2px 10px 0 rgba(0,0,0,0.1)',
    boxShadowsValuesHover : '0 2px 31px 0 rgba(0,0,0,0.15), 0 2px 19px 0 rgba(0,0,0,0.1)',
    cardBorderRadius : '6px',
    standardMargin : '16px',
};


export default theme
