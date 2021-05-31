/**
 * Copyright 2020 Phenix Real Time Solutions, Inc. Confidential and Proprietary. All Rights Reserved.
 */
import React from 'react';
import styled, {css} from 'styled-components';
import {theme} from '../../../style';

const {colors} = theme;
const Layer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 100px;
  background-color: ${colors.blue100};
  transition: .5s linear all !important;
  z-index: 1;
  ${({checked}) => checked && css`
    background-color: ${colors.red};
  `}
`;
const Checkbox = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  transition: .2s linear all !important;
`;

const Knob = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  transition: .2s linear all;
  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 4px;
    width: 12px;
    height: 0px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 6px 2px;
    background-color: ${colors.white};
    border-radius: 50%;
    transition: .2s linear all !important;
    ${({checked}) => checked && css`
      content: '';
      left: 18px;
      background-color: ${colors.lightBlue};
    `}
  }
  `;

const Button = styled.div`
  position: relative;
  top: 50%;
  width: 33px;
  height: 16px;
  margin: 0px auto 0 auto;
  overflow: hidden;
  border-radius: 100px;
  transition: .2s linear all !important;
`;

export const ToggleButton = ({checked, onClick}) => {
  return (
    <Button onClick={onClick} className="toggle-preview">
      <Checkbox defaultChecked={checked} />
      <Knob checked={checked}/>
      <Layer checked={checked}/>
    </Button>
  );
};