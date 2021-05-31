import styled, {css} from 'styled-components';
import {theme} from '../../style';

const {colors, primaryBorderRadius, spacing, fontSize} = theme;

export const CardLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: ${primaryBorderRadius};
  transition: box-shadow 0.2s;
  cursor: 
  &:hover{
    box-shadow: 0px 4px 15px rgba(0,0,0,.1);
  }
  margin-bottom: 0.5rem;
  padding: ${spacing.xSmall} ${spacing.small};
  ${({edit}) => edit && css`
    min-height: 70px;
  `}
  ${({active}) => active && css`
    box-shadow: 0px 4px 15px rgba(0,0,0,.1);
  `}
`

export const DueDate = styled.div`
  color: ${colors.gray600};
  display: flex;
  flex: 1;
  font-size: ${fontSize.fontSizeXS};
  align-items: flex-start;
  svg {
    margin-right: ${spacing.xxSmall};
  }
`

export const Layer = styled.div`
  margin: ${spacing.xxSmall} 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const Title = styled.div`
  display: flex;
  flex: 1;
  font-size: 10px;
  color: ${colors.$zdBlueInverse}
`

export const IconComponent = styled.div`
  width: 15px;
  cursor: pointer !important;
`
