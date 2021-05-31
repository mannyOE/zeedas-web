import React from 'react';
import GitlabIcon from './icon-gitlab';

const ConnectButton = () => {
  return (
    <button type="button" className="d-flex align-items-center">
      <GitlabIcon />
      <span>Connect to your Github Account</span>
    </button>
  );
};

export default ConnectButton;
