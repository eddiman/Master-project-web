import React from 'react';
import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: wrap;
        @media (max-width: 996px) {
        flex-direction: column;
}
`;