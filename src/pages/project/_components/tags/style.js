/**
 * Copyright 2020 Phenix Real Time Solutions, Inc. Confidential and Proprietary. All Rights Reserved.
 */
import styled, {css} from 'styled-components';
import {theme} from '../../style';

const {colors, spacing, fontSizeXS} = theme;

export const TagContainer = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  font-weight: 500;
  place-self: flex-start;
  margin: ${spacing.xxSmall};
  color: ${colors.$zdBlue};
  background-color:  ${colors.$zdBlue}1A;
  ${props => props.size === 'small' && css`
    height: 24px;
    padding: ${spacing.small};
    font-size: ${fontSizeXS};
    line-height: 24px;
  `}
  p {
    max-width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0;
    margin-right: ${spacing.xxSmall};
  }
  span{
    margin: 0;
    padding-bottom: 1px;
  }
`;