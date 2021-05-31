import React from 'react';
import {useComponentVisible} from '../custom-hooks';
import {MenuWrapper, MenuDropDownWrapper, MenuContent} from './style';

export const withDropdownMenu = (Component, top) => {
  return (props) => {
    const {children} = props;
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    const handleClick = (event) => {
      event.stopPropagation();
      setIsComponentVisible(!isComponentVisible)
    }
   
    return (
      <MenuWrapper ref={ref}>
        <Component {...props} onClick={handleClick} />
        <MenuDropDownWrapper visible={isComponentVisible} top={top}>
          <MenuContent>
            {children}
          </MenuContent>
        </MenuDropDownWrapper>
      </MenuWrapper>      
    )
  }
}