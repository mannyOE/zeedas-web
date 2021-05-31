import React from 'react';
import {Button} from './style';
import { withDropdownMenu } from '../menu';


export const IconMenu = (props) => {
  const {title, onClick} = props;

  return (
    <Button role="button" tabIndex={0} onClick={onClick}>
      {title && title}
    </Button>
  );
};

export default withDropdownMenu(IconMenu);