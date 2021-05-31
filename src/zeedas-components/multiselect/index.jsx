import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import Select from "react-select";
// import {makeAnimated} from 'react-select/animated';

// const animatedComponents = makeAnimated();

const MultiSelect = (props) => {
  const {
    options,
    className,
    value,
    onChange,
    isClearable,
    placeholder,
    classNamePrefix,
    wrapValues,
    error,
    defaultPadding,
  } = props;
  return (
    <>
      <Select
        className={`MultiSelect ${className} ${wrapValues ? "nowrap" : ""} ${
          error ? "error" : ""
        } ${defaultPadding ? "defaultPadding" : ""}`}
        closeMenuOnSelect={false}
        classNamePrefix={classNamePrefix}
        default={null}
        //   components={animatedComponents}
        isMulti
        isSearchable
        options={options}
        value={value}
        onChange={onChange}
        isClearable={isClearable}
        placeholder={placeholder}
      />
      {error && <span className="default-input-error__message">{error}</span>}
    </>
  );
};

MultiSelect.defaultProps = {
  classNamePrefix: "MultiSelect",
  options: {},
  onChange: () => {},
  wrapValues: true,
  error: null,
};

MultiSelect.propType = {
  className: PropTypes.string,
};

export default MultiSelect;
