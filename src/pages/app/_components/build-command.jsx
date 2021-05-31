import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

const CodeTextArea = ({ id, label }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="code-textarea">
      <button onClick={toggle} type="button" className="code-textarea__toggle" id={id}>
        {label}
      </button>
      <Collapse isOpen={isOpen}>
        <div className="code-textarea__wrapper">
          <div className="py-2 px-3 code-textarea__header">
            <span>Use && for multiple commands</span>
          </div>
          <textarea
            className="py-2 px-3"
            name="command"
            id={id}
          />
        </div>
      </Collapse>
    </div>
  );
};

CodeTextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CodeTextArea;
