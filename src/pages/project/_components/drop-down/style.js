import styled, {css} from 'styled-components';
import {Input} from '../form/style';
import {theme} from '../../style';

const {spacing, colors, fontSizeS, primaryBorderRadius} = theme;

export const DropdownContainer = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-content: flex-start;
  margin: ${spacing.xSmall} 0;
  label{
    font-size: ${fontSizeS};
    color: ${colors.gray900};
    font-weight: bold;
    margin: ${spacing.xxSmall} 0;
  }
`;

export const DropdownInput = styled(Input)`
  display: inline-block;
  line-height: 24px;
  min-width: 200px !important;
  width: 100%;
  z-index: 0;
  ${props => props.showMenu && css`
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-width: 0;
  `}
`;

export const DropdownMenu = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  top: calc(100% - 4px);
  position: absolute;
  height: auto;
  max-height: 210px;
  border: 1px solid ${colors.gray400};
  border-top-width: 0;
  z-index: 1;
  background-color: ${colors.white};
  border-bottom-left-radius: ${primaryBorderRadius};
  border-bottom-right-radius: ${primaryBorderRadius};
`;

export const DropdownMenuItem = styled.div`
  width: 100%;
  height: auto;
  line-height: 24px;
  padding: ${spacing.xxSmall};
  padding-left: ${spacing.small};
  font-size: ${fontSizeS};
  border-left-color: transparent;
  border-right-color: transparent;
  cursor: pointer;
  word-wrap: break-word;
  :hover{
    background-color: ${colors.gray300};
  }
  ${props => props.active && css`
    background-color: ${colors.gray300};
  `}
  ${props => props.selected && css`
    background-color: ${colors.gray300};
    font-weight: bold;
  `}
  ${props => props.disabled && css`
    color: ${colors.gray500};
    :hover{
      background-color: ${colors.white};
      cursor: text;
    }
  `}
`;