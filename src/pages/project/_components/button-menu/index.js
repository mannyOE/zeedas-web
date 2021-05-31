import React from 'react';
import {FaAngleDown} from 'react-icons/fa'
import { DropdownButton } from './style';
import { withDropdownMenu } from '../menu';

const ButtonMenu = (props) => {
  const {onClick, title, color} = props;
  return (
    <DropdownButton onClick={onClick} color={color}>
      {title} <FaAngleDown />
    </DropdownButton>
  )
}

export default withDropdownMenu(ButtonMenu, '40px');