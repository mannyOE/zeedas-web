import styled,{css} from 'styled-components';
import {theme} from '../../style';

const {colors, spacing, fontSize} = theme;

export const MenuWrapper = styled.div`
  position: relative;
  div {
    outline: none;
  }
`;

export const MenuDropDownWrapper = styled.div`
  position: absolute;
  width: 200px;
  min-height: 31px;
  top: ${(props) => props.top || '1rem'};
  right: -6px;
  background-position: top 0rem right .5rem;
  padding-top: .4rem;
  background-repeat: no-repeat;
  z-index: 9;
  display: none;
  ${(props) => props.visible && css`
    display: block;
  `}
`;

export const MenuContent = styled.div`
  background-color: ${colors.white};
  width: 100%;
  overflow: auto;
  border-radius: ${spacing.xxSmall};
  padding: ${spacing.small} 1px;
  z-index: 10;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
`;

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