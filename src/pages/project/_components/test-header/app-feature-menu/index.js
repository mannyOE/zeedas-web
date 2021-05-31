import React from 'react';
import {FaAngleDown} from 'react-icons/fa';
import { withDropdownMenu } from '../../menu';
import { MenuItem } from './style';

const AppFeature = (props) => {
  const { onClick } = props;

  return (
    <MenuItem onClick={onClick}>
      <React.Fragment>App Feature <FaAngleDown /></React.Fragment>
    </MenuItem>
  );
};

export default withDropdownMenu(AppFeature, '20px');