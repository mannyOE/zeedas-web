import styled, {css} from 'styled-components';
import { theme } from '../../style';
import { Button } from 'reactstrap';

const {spacing, colors, fontSize, primaryBorderRadius} = theme;

export const TestCasesWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${spacing.large} ${spacing.xSmall};
  padding: ${spacing.xSmall};
  max-width: 500px;
  min-width: 400px;
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-self: flex-start;
  color: ${colors.black};
  align-items: flex-end;
  justify-content: space-between;
  h3 {
    font-size: ${fontSize.fontSize};
    font-weight: 700;
    margin: 0;
  }
`

export const List = styled.div`
  background-color: ${colors.white};
  margin: ${spacing.xSmall} 0;
  border-radius: ${primaryBorderRadius};
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  height: 100%;
`

export const ListBody = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow-y: auto;
  flex-direction: column;
  padding: ${spacing.xxSmall} 0;
  ${({center}) => center && css`
    padding: 0;
    align-items: center;
    justify-content: center;
  `}
`

export const ListBodyCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  .empty-record {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: fit-content;
    }
  }
`

export const ListFooter = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-height: 80px;
  justify-content: space-evenly;
  align-items: center;
`

export const TestButton = styled(Button).attrs(() => ({
  size: 'md'
}))`
  border-radius: ${primaryBorderRadius};
  border: 1px solid ${colors.black};
  color: ${colors.black};
  background-color: ${colors.white};
  width: 120px;
  margin: 0 ${spacing.small};
`

export const NewTestButton = styled(TestButton)`
  color: ${colors.white};
  background-color: ${colors.blue100}D9;
  border-color: ${colors.blue100};
`

export const MenuItem = styled.div`
  width: 100%;
  height: 30px;
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