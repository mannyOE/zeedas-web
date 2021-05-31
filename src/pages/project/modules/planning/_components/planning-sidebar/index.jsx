import React from 'react';
import './style.scss';

import PropTypes from 'prop-types';
import { ClockIcon } from '../../../../../../zeedas-assets/icons/icon-clock';
import { useDispatch } from 'react-redux';
import { planning } from 'state/redux/planning/actions';
import { useSelector } from 'react-redux';
import { COMMENT_TYPES } from 'utils/constants';
import { comment } from 'state/redux/comment/actions';

const ModuleSnippet = ({ snippet, selectSnippet, active }) => {
  const iconProps = {
    dimension: {
      width: 8.28,
      height: 8.25,
    },
    color: active ? '#fff' : 'rgba(3, 41, 61, 0.5)',
    strokeWidth: 1,
  };
  return (
    <a
      onClick={() => selectSnippet(snippet)}
      className={`ModuleSnippet d-block ${active ? 'active' : ''}`}
    >
      <div className="card p-3 mb-2">
        <div className="font-10 mb-2">{snippet.name}</div>
        <div className="ModuleSnippet__duedate d-flex align-items-center font-8">
          <ClockIcon {...iconProps} />
          <span className="ml-2">{new Date(snippet.createdAt).toDateString()}</span>
        </div>
      </div>
    </a>
  );
};

const PlanningSidebar = ({
  task,
  className,
  moduleSnippets,
}) => {

  const dispatch = useDispatch()
  const activeSnippet = useSelector(state => state.planning.activeSnippet)

  const selectSnippet = (snippet) => {
    dispatch(planning.setActiveSnippet(snippet))
    dispatch(
      comment.setCommentTarget({
        id: snippet._id,
        type: COMMENT_TYPES.class,
        app: snippet.app,
        module: task._id,
        name: snippet.name
      })
    );
  }

  return (
    <div className={`PlanningSidebar p-4 h-100 ${className}`}>
      <div className="PlanningSidebar__module px-3 py-2 mb-5">
        <h2 className="font-8 font-weight-bold mb-1">Module Name</h2>
        <div className="font-10">{task.name}</div>
      </div>

      <h2 className="font-12">Snippet</h2>
      {moduleSnippets.map((snippet, index) => (
        <ModuleSnippet
          active={activeSnippet._id === snippet._id}
          selectSnippet={selectSnippet}
          snippetIndex={index}
          snippet={snippet}
          key={index}
        />
      ))}
    </div>
  );
};

PlanningSidebar.defaultProps = {
  className: '',
};

PlanningSidebar.propTypes = {
  className: PropTypes.string,
};

export default PlanningSidebar;
