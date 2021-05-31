import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types';
import IconInfoSolid from '../../../zeedas-assets/icons/icon-info-solid';

const InfoPopover = ({ id }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <>
      <button
        style={{
          background: 'none',
          padding: 0,
          border: 0,
          boxShadow: 'none',
        }}
        className="mr-1"
        id={id}
        type="button"
      >
        <IconInfoSolid />
      </button>
      <Popover
        isOpen={popoverOpen}
        placement="bottom"
        target={id}
        toggle={toggle}
      >
        <PopoverHeader>Connect Zeedas to your Github Account </PopoverHeader>
        <PopoverBody>
          <ul className="ml-3 p-0">
            <li className="m-0 p-0">Select app</li>
            <li className="m-0 p-0">Select repository</li>
          </ul>
        </PopoverBody>
      </Popover>
    </>
  );
};

InfoPopover.propTypes = {
  id: PropTypes.string.isRequired,
};

export default InfoPopover;
