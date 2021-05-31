import React, { useState } from "react";
import * as uuid from "uuid";
import { useComponentVisible } from "../custom-hooks";
import {
  SelectContainer,
  TextArea,
  PlaceHolder,
  Menu,
  MenuItem,
} from "./style";

export const Select = (props) => {
  const { items, selectedItem, handleSelect, itemKey, placeholder } = props;
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const generateOptions = () => {
    return items.map((item) => {
      return (
        <MenuItem key={uuid.v1()} onClick={() => handleSelect(item)}>
          {item[itemKey]}
        </MenuItem>
      );
    });
  };

  const options = generateOptions();
  return (
    <SelectContainer
      ref={ref}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
    >
      <TextArea>
        {(selectedItem && selectedItem[itemKey]) || (
          <PlaceHolder>{placeholder}</PlaceHolder>
        )}
      </TextArea>
      {isComponentVisible && <Menu>{options}</Menu>}
    </SelectContainer>
  );
};
