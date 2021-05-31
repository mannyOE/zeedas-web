/**
 * Copyright 2020 Phenix Real Time Solutions, Inc. Confidential and Proprietary. All Rights Reserved.
 */
import React from 'react';
import {TagContainer} from './style';
import {FaTimes} from 'react-icons/fa';

export const Tag = (props) => {
  const {label, onClose, size} = props;

  return (
    <TagContainer size={size}>
      <p>{label}</p>
      <span role="button" tabIndex={-1} onKeyPress={() => null} onClick={onClose}><FaTimes /></span>
    </TagContainer>
  );
};