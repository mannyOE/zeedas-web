import { Button } from 'reactstrap';
import styled from 'styled-components';
import { theme } from '../../style';

const {colors, fontSize, spacing, primaryBorderRadius} = theme;
export const DropdownButton = styled(Button).attrs(() => ({
  size: 'md'
}))`
  background: ${({color}) => color}D9;
  color: ${colors.white};
  max-width: 80px;
  text-transform: capitalize;
  min-width: 80px;
  flex-shrink: 0;
  width: 100%;
  padding-right: ${spacing.xxSmall};
  padding-left: ${spacing.xxSmall};
  font-size: ${fontSize.fontSizeS};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${primaryBorderRadius};
  border: 2px solid ${({color}) => color}; 
`