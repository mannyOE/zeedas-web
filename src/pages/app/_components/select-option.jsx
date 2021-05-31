/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import colors from "../../../utils/colors";

const selectStyles = (borderless, borderStyle) => ({
  control: (styles, state) => ({
    ...styles,
    backgroundColor: state.selectProps.bgColor,
    borderRadius: `${borderless ? "none" : "10px"}`,
    // border: borderStyle || "",
    ...borderStyle,
    height: `${
      borderless
        ? "unset"
        : state.selectProps.height
          ? state.selectProps.height
          : "55px"
    }`,
    width: state.selectProps.width || "100%",
    padding: `${
      borderless
        ? "0"
        : state.selectProps.padding || "0 24px"
        // ? state.selectProps.padding
        // : "0 24px"
    }`,
    borderWidth: `${borderless ? "0" : "2px"}`,
    boxShadow: "none",
    borderColor: state.isSelected
      ? "#d4d2d7"
      : state.isFocused
        ? "#d4d2d7"
        : "#e8e9ed",
    color: state.isDisabled
      ? "#ccc"
      : state.isSelected
        ? colors.ZEEDAS_DARK_BLUE
        : state.isFocused
          ? colors.ZEEDAS_DARK_BLUE
          : colors.ZEEDAS_DARK_BLUE,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isDisabled
      ? null
      : state.isSelected
        ? colors.ZEEDAS_LIGHT_BLUE
        : state.isFocused
          ? colors.ZEEDAS_LIGHTER_GREY
          : null,
    color: state.isDisabled
      ? "#ccc"
      : state.isSelected
        ? colors.ZEEDAS_DARK_BLUE
        : colors.ZEEDAS_DARK_BLUE,
    cursor: state.isDisabled ? "not-allowed" : "default",
    ":active": {
      ...styles[":active"],
      backgroundColor:
          !state.isDisabled
          && (state.isSelected
            ? colors.ZEEDAS_DARK_BLUE
            : colors.ZEEDAS_LIGHT_GREY),
    },
  }),
  input: (styles) => ({ ...styles, color: colors.ZEEDAS_DARK_BLUE }),
  placeholder: (styles, state) => ({
    ...styles,
    color: !state.selectProps.placeholderColor
      ? "#fff"
      : state.selectProps.placeholderColor,
  }),
  singleValue: (styles) => ({ ...styles, color: colors.ZEEDAS_DARK_BLUE }),
});
const SelectOption = ({
  options,
  onChange,
  placeholder,
  selectedOption,
  label,
  width,
  padding,
  height,
  value,
  bgColor,
  border,
  borderStyle,
  color,
  placeholderColor,
  disabled,
  isMulti,
  isClearable,
  isSearchable,
  isRtl,
  borderless,
  hideIndicator,
  className,
  isLoading,
  formatOptionLabel,
  optionLabel,
}) => (
  <Select
    options={options}
    onChange={onChange}
    styles={selectStyles(borderless, borderStyle)}
    placeholder={placeholder}
    isClearable={isClearable}
    isSearchable={isSearchable}
    isLoading={isLoading}
    isRtl={isRtl}
    isMulti={isMulti}
    bgColor={bgColor}
    border={border}
    color={color}
    height={height}
    width={width}
    padding={padding}
    placeholderColor={placeholderColor}
    isDisabled={disabled}
    value={value}
    getOptionLabel={optionLabel}
    formatOptionLabel={formatOptionLabel}
    components={{
      ...(hideIndicator && {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }),
    }}
    className={className}
  />
);

SelectOption.defaultProps = {
  options: [],
};

SelectOption.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
};

export default SelectOption;
