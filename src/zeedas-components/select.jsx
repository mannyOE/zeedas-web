import React from "react";
import Select from "react-select";

class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      clearable: true,
      selectValue: "",
    };
  }

  render() {
    // let { clearable } = this.state;

    let {
      data,
      valueKey,
      textField,
      selectValue,
      onValueChange,
      multiSelectMode,
      placeholder,
      disabled,
      clearable,
      defaultValue,
      name,
    } = this.props;
    multiSelectMode = multiSelectMode !== undefined;
    disabled = disabled !== undefined ? disabled : false;
    clearable = clearable !== undefined ? clearable : true;
    return (
      <div>
        <Select
          placeholder={placeholder}
          options={data}
          multi={multiSelectMode}
          labelKey={textField}
          valueKey={valueKey}
          autofocus
          clearable={clearable}
          disabled={disabled}
          value={selectValue}
          onChange={onValueChange}
          name={name}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
}

export default SelectList;
