import styled, {css} from 'styled-components';
import { theme } from '../../style';
import { MenuContent } from '../menu/style';

const {colors, spacing} = theme;

export const CaseContainer = styled.div`
  display: flex;
  flex: 0;
  justify-content: space-between;
  align-items: center;
  margin: ${spacing.xxSmall} 0;
  margin-right: ${spacing.xSmall};
  p {
    margin: 0;
  }
  ${MenuContent}{
    padding: 0;
    border-radius: 0;
  }
`

export const ProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProcessItem = styled.div`
  margin: ${spacing.xxSmall} 0;
  padding: ${spacing.xxSmall};
  border: 2px solid;
  border-color: transparent transparent transparent ${({borderColor}) => borderColor}
`

export const Option = styled.div`
  width: 100%;
  height: 50px;
  padding: ${spacing.xSmall};
  color: ${colors.black};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${colors.gray200};
  }
  ${(props) => props.space && css`
    justify-content: space-between;
  `}
  svg {
    margin-right: ${spacing.xSmall};
  }
  ${(props) => props.border && css`
    border-top: 1px solid ${colors.gray300};
  `}
  ${(props) => props.color && css`
    color: ${props.color};
  `}
`