import React from 'react';
import IconFile from 'zeedas-assets/icons/icon-file';
import './style.scss';
import IconFolder from '../../../../../../zeedas-assets/icons/icon-folder';
import IconPlus from '../../../../../../zeedas-assets/icons/icon-plus';
import PropTypes from 'prop-types';

const Folder = ({ name }) => (
  <div className="d-flex align-items-center PlanningFileSystem__item">
    <IconFolder />
    <span className="ml-3">{name}</span>
  </div>
);

const File = ({ name }) => (
  <div className="d-flex align-items-center PlanningFileSystem__item">
    <IconFile />
    <span className="ml-3">{name}</span>
  </div>
);

const items = [
  {
    type: 'folder',
    name: '.vscode',
  },
  {
    type: 'folder',
    name: 'Modules',
  },
  {
    type: 'folder',
    name: 'Public',
  },
  {
    type: 'folder',
    name: 'Utils',
  },
  {
    type: 'folder',
    name: 'Views',
  },
  {
    type: 'file',
    name: '.DS_Store',
  },
  {
    type: 'file',
    name: '.gitignore',
  },
];
const PlanningFileSystem = ({ className }) => {
  return (
    <div className={`PlanningFileSystem py-4 ${className}`}>
      <div className="d-flex mb-3">
        <div className="create-new dropdown">
          <button
            class="dropdown-toggle px-3 d-flex"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <IconPlus height={9.56} width={9.56} stroke={'#fff'} />
            <span className="ml-3">Create New</span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">
              Create File
            </a>
            <a class="dropdown-item" href="#">
              Create Folder
            </a>
          </div>
        </div>
        <button className="px-3 ml-3 d-flex">
          <span>Move File</span>
        </button>
      </div>
      <div>
        {items.length > 0 ? (
          items.map((item) =>
            item.type === 'file' ? (
              <File name={item.name} />
            ) : (
              item.type === 'folder' && <Folder name={item.name} />
            )
          )
        ) : (
          <span>File system unavailable</span>
        )}
      </div>
    </div>
  );
};

PlanningFileSystem.defaultProps = {
  className: '',
};
PlanningFileSystem.propTypes = {
  className: PropTypes.string,
};

export default PlanningFileSystem;
