import React from 'react';
import Styled from 'styled-components';
import theme, {constants} from '../theme/theme';

export const CardOuter = Styled.div`
    background-color: ${theme.appWhite};
    border-radius: ${constants.cardBorderRadius};
    box-shadow: ${constants.boxShadowsValues};
    width: 100%;
    padding-bottom: ${constants.standardMargin};
`;

export const DarkBar = Styled.div`
    width: 100%;
    height: 12px;
    background-color: ${theme.colorPrimaryDark};
    border-radius: 3px 3px 0 0;

`;
export const TitleBar = Styled.div`
    width: 100%;
    height: 32px;
    background-color: ${theme.colorPrimary};
    box-shadow: ${constants.boxShadowsValues};

`;
