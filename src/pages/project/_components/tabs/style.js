import styled, { css } from 'styled-components';
import {theme} from '../../style';

const {spacing, colors} = theme

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
`;

export const TabsWrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  width: inherit;
  align-self: stretch;
`;

export const TabButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 14px;
  padding: ${spacing.small} ${spacing.medium};
  min-width: 100px;
  outline: none !important;
  ${({selected}) => selected && css`
    border: 0px solid ${colors.red};
    border-bottom-width: 1px;
    font-weight: bold;
    color: ${colors.red};
  `}
`

export const TabList = styled.div`
  border: 0px solid ${colors.gray300};
  border-bottom-width: 1px;
  display: flex;
  width: 100%;
  flex: 0 1;
  justify-content: space-between;
  align-items: flex-start;
  align-self: flex-start;
  flex-wrap: wrap;
`