import React, { useState } from 'react';
import "./style.scss"
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import colors from 'utils/colors';

const CheckMark = ({ fill }) => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="TestFilter__select "
  >
    <path
      d="M4.19998 8.40003C4.04083 8.40003 3.88827 8.33688 3.77577 8.22438L0.175727 4.62418C-0.0585757 4.38988 -0.0585757 4.01008 0.175727 3.77577C0.41003 3.54147 0.789985 3.54147 1.02414 3.77577L4.19998 6.95161L10.9759 0.175727C11.2102 -0.0585757 11.5901 -0.0585757 11.8243 0.175727C12.0586 0.41003 12.0586 0.789985 11.8243 1.02429L4.62418 8.22438C4.51168 8.33688 4.35913 8.40003 4.19998 8.40003Z"
      fill={fill}
    />
  </svg>
);

const list = [
  {
    title: 'Has Test',
    value: 'has-test',
  },
  {
    title: 'No Test',
    value: 'no-test',
  },
  {
    title: 'QA Review',
    value: 'qa-review',
  },
];

const TestFilter = ({ activeFilters, addFilter, removeFilter }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      className="TestFilter"
      direction="right"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle tag="a" className="TestFilter__menu-btn ml-2 font-6">
        •••
      </DropdownToggle>
      <DropdownMenu
        className="TestFilter__menu px-3 py-2"
        positionFixed={true}
        right={true}
        bottom={true}
      >
        <div className="TestFilter__header border-bottom py-2 mb-2 font-12">Filter</div>

        {list.map((item, index) => (
          <div
            className={`d-flex align-items-center justify-content-between TestFilter__option py-1 ${
              activeFilters.includes(item.value) ? 'active' : ''
            }`}
            onClick={() =>
              activeFilters.includes(item.value)
                ? removeFilter(item.value)
                : addFilter(item.value)
            }
            key={index}
          >
            <span>{item.title}</span>
            <CheckMark
              fill={
                activeFilters.includes(item.value)
                  ? `${colors.ZEEDAS_GREEN}`
                  : 'rgba(3, 42, 63, 0.2)'
              }
            />
          </div>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TestFilter;
