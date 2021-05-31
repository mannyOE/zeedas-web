import React from "react";
import PropTypes from "prop-types";
import chroma from "chroma-js";

import Select from "react-select";
import colors from "../../../utils/colors";

const selectStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: state.selectProps.bgColor,
    border: state.selectProps.border,
    borderRadius: "10px",
    height: "55px",
    width: "100%",
    borderColor: "1px solid #000",
    color: "white",
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isDisabled
      ? null
      : state.isSelected
        ? colors.ZEEDAS_DARK_BLUE
        : state.isFocused
          ? colors.ZEEDAS_LIGHTER_GREY
          : null,
    color: state.isDisabled
      ? "#ccc"
      : state.isSelected
        ? colors.ZEEDAS_WHITE
        : colors.ZEEDAS_DARK_BLUE,
    cursor: state.isDisabled ? "not-allowed" : "default",
    ":active": {
      ...styles[":active"],
      backgroundColor: !state.isDisabled && (state.isSelected ? colors.ZEEDAS_DARK_BLUE : colors.ZEEDAS_LIGHT_GREY),
    },
  }),
  // input: (styles) => ({ ...styles, color: colors.ZEEDAS_DARK_BLUE }),
  placeholder: (styles, state) => ({
    ...styles,
    color: !state.selectProps.placeholderColor
      ? "#fff"
      : state.selectProps.placeholderColor,
  }),
  singleValue: (styles) => ({ ...styles, color: colors.ZEEDAS_WHITE }),

};

const Selector = ({
  options,
  onChange,
  placeholder,
  selectedOption,
  label,
  value,
  isClearable,
  bgColor,
  border,
  placeholderColor,
}) => (
  <>
    <Select
      options={options}
      onChange={onChange}
      styles={selectStyles}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable
      bgColor={bgColor}
      border={border}
      placeholderColor={placeholderColor}
    />
  </>

);

Selector.defaultProps = {
  options: [],
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
};

export default Selector;
