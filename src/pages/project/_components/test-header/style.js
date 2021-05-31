import styled from 'styled-components';
import { Button as ReactStrapButton} from 'reactstrap';
import { theme } from '../../style';
const {colors, spacing} = theme;


export const Header = styled.header`
  display: flex;
  width: 100%;
  flex: 1;
  height: 76px;
  background-color: ${colors.$zdDarkBlue};
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing.xLarge}
`

export const Brand = styled.div`

`

export const MenuBar = styled.nav`
  display: flex;
  flex-grow: 0;
  align-items: center;
`

export const MenuItem = styled.div`
  margin: 0 ${spacing.medium};
  color: ${colors.white};
  cursor: pointer;
`

export const Button = styled(ReactStrapButton).attrs(() => ({
  size: 'md'
}))`
  background: ${colors.$zdGreen};
  border-color: ${colors.$zdGreen};
  color: ${colors.white};
`