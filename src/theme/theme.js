import createTheme from 'styled-components-theme';
import colors from './colors';

const theme = createTheme(...Object.keys(colors));


export const constants = {
    boxShadowsValues : '0 2px 5px 0 rgba(0,0,0,0.04), 0 2px 10px 0 rgba(0,0,0,0.02)',
    cardBorderRadius : '3px',
    standardMargin : '16px'
};


export default theme
