import styled from 'styled-components';
import { theme } from '../../../style';
import { NewTestButton } from '../style';
import { Input } from 'reactstrap';

const caratDown = '/drop-down-arrow.svg'; 
const {spacing, colors, primaryBorderRadius} = theme;

export const Wrapper = styled.div`
  .modalContent {
    width: 50% !important
  }
  ${theme.media.sm}{
    width: 100% !important;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-color: ${colors.white};
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${spacing.medium} ${spacing.xLarge};
  align-items: center;
  ${NewTestButton}{
    margin-top: ${spacing.small};
    width: 100%;
  }
`

export const Header = styled.p`
  color: ${colors.black};
  margin: 0;
  align-self: flex-start;
  font-weight: 700;
`

export const TestInput = styled(Input)`
  margin: ${spacing.small} 0;
  border-radius: 5px;
`

export const TextInputArea = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: ${spacing.small} 0;
  color: ${colors.black} !important;
  padding: ${spacing.small};
  background-color: ${colors.gray200};
  border-radius: 10px;
  textarea{
    background-color: transparent;
    border: none;
    resize: none;
    width: 100%;
  }
`