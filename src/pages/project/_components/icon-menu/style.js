import styled,{css} from 'styled-components';
import {theme} from '../../style';

const {spacing, fontSize} = theme;

export const MenuItem = styled.div`
  display: flex;
  min-width: 100%;
  height: 32px;
  align-items: center;
  font-size: ${fontSize.fontSize};
  justify-content: flex-start;
  :hover {
    font-weight: 700;
  }
  svg {
    margin: 0 ${spacing.small};
    height: 14px;
    width: 14px;
  }
  p {
    margin: 0;
    padding: 0;
  }
  ${props => props.color && css`
    color: ${props.color}
  `}
`

export const Button = styled.div`
  cursor: pointer !important;
  svg {
    margin: 0 ${spacing.xxSmall};
  }
`