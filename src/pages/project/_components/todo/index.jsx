import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Label, Input } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
//import { projectService } from "./projects.service";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from '../../../../constants';
import { ERROR_RESPONSE } from '../../../../utils/constants';
import { notify } from '../../../../zeedas-components/bottom-notification';
import ZeedasInput from '../../../../zeedas-components/input';
import ZeedasTextArea from '../../../../zeedas-components/text-area';
import ZeedasCheckbox from '../../../../zeedas-components/checkbox';
import CardComponent from '../../../../zeedas-components/card';
import BlockLevelButton from '../../../../zeedas-components/block-level-button';
import IconPlus from '../../../../zeedas-assets/icons/icon-plus';
import TabNavigation from '../../../../zeedas-components/tab-navigation';
import ProjectIconsList from '../../../../zeedas-components/project-icons-list';
import ButtonLoadingIcon from '../../../../zeedas-assets/icons/icon-button-loader';
import UploadIcon from '../../../../zeedas-components/upload-icon';
import validators from '../../../../utils/validators';
import Select from 'react-select';
import { projectActions } from '../../../../state/redux/project/actions';
import colors from '../../../../utils/colors';

const CreateTodo = ({
  closeModal,
  getProjects,
  single_project,
  accountId,
  loggedInUserId,
  project_todo,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(single_project).length !== 0) {
      dispatch(projectActions.fetchTodo(single_project._id));
    }
  }, [single_project]);

  const users = () => {
    if (Object.keys(single_project).length !== 0) {
      return single_project.users.map((user) => {
        //let id = user._id,
        let member = { value: user.user._id, label: user.user.name };
        return member;
      });
    } else return '';
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: colors.ZEEDAS_DARK_BLUE,
      width: '100%',
    }),
    option: (styles, { isDisabled, isSelected, isFocused }) =>
      // const color = chroma(data.color);
      ({
        ...styles,
        // width: "500px",
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? colors.ZEEDAS_DARK_BLUE
          : isFocused
          ? colors.ZEEDAS_DARK_BLUE
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? colors.ZEEDAS_WHITE
          : isFocused
          ? colors.ZEEDAS_WHITE
          : colors.ZEEDAS_DARK_BLUE,
        cursor: isDisabled ? 'not-allowed' : 'default',
      }),
    input: (styles) => ({
      ...styles,
      color: colors.ZEEDAS_GREY,
      backgroundColor: colors.ZEEDAS_DARK_BLUE,
      opacity: '0.04',
    }),
    //   placeholder: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles) => ({ ...styles, color: colors.ZEEDAS_DARK_BLUE }),
  };
  const [state, setState] = useState({
    task: '',
    userId: '',
  });
  const [requesting, setRequesting] = useState(false);
  const onInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange = (selectedId) => {
    setState({ ...state, userId: selectedId });
  };

  const createTodo = async () => {
    setRequesting(true);
    const userId =
      loggedInUserId !== single_project.leadId
        ? loggedInUserId
        : state.userId.value;
    let slug = `${single_project.name}-${state.task.substring(0, 3)}`;

    const payload = {
      ...state,
      userId: userId,
      slug: slug,
      projectId: single_project._id,
      accountId: accountId,
    };
    await dispatch(projectActions.createTodo(payload));
    await dispatch(projectActions.fetchTodo(single_project._id));
    setState({
      ...state,
      task: '',
      userId: '',
    });
    setRequesting(false);
  };
  const onCheckChanged = async (id) => {
    await dispatch(projectActions.markTodo(single_project._id, id));
    await dispatch(projectActions.fetchTodo(single_project._id));
  };
  // <CardComponent>
  return (
    <div className="create-project">
      <div className="">
        <h1 className="modalTitle">Todo List</h1>
        <p className="description-header">
          {' '}
          Enter the Details of the Project u would like to create and assign a
          team lead specific to this project
        </p>
      </div>
      {Object.keys(single_project).length !== 0 && (
        <>
          <div className="d-flex align-items-end justify-content-between">
            {loggedInUserId !== single_project.leadId && (
              <>
                <div style={{ width: '100%' }}>
                  <ZeedasInput
                    label="Create New Todo"
                    placeholder="Enter todo description"
                    onChange={onInputChange}
                    value={state.task}
                    name="name"
                    type="text"
                  />
                </div>
              </>
            )}

            {loggedInUserId === single_project.leadId && (
              <>
                <div style={{ width: '60%', marginRight: '5px' }}>
                  <ZeedasInput
                    label="Create New Todo"
                    placeholder="Enter todo description"
                    onChange={onInputChange}
                    value={state.task}
                    name="task"
                    type="text"
                  />
                </div>

                <div style={{ width: '35%' }}>
                  <Select
                    label="Assign"
                    options={users()}
                    className="assign-team"
                    onChange={handleChange}
                    value={state.userId}
                    selected={state.userId}
                    selectedOption={state.userId}
                    // value={state.userId}
                    styles={selectStyles}
                    placeholder="Assign"
                    isSearchable={false}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-4" style={{ width: '30%' }}>
            <BlockLevelButton
              color="zd-blue"
              border="none"
              onClick={createTodo}
            >
              {requesting ? (
                <span className="d-flex justify-content-center align-items-center">
                  <ButtonLoadingIcon
                    margin="0 10px 0 0"
                    height="16px"
                    width="16px"
                  />
                </span>
              ) : (
                <span>Add Task</span>
              )}
            </BlockLevelButton>
          </div>
          <hr className="mt-5 mb-4" />
          {project_todo.length > 0 && (
            <>
              {project_todo.map((todo, i) => (
                <Row key={todo._id} className="mb-4 todo">
                  <Col xs="8">
                    <ZeedasCheckbox
                      checked={todo.done}
                      handleCheckboxChange={() => onCheckChanged(todo._id)}
                      id={todo._id}
                      text={
                        todo.task.charAt(0).toUpperCase() + todo.task.slice(1)
                      }
                    />
                  </Col>
                  <Col xs="4">
                    <div
                      style={{
                        borderLeft: '1px solid #E8E7EA',
                        paddingLeft: '20px',
                      }}
                      className="align-items-center d-flex"
                    >
                      <>
                        {todo.user.userInfo.avatar === '' ? (
                          <div
                            className="todo-default-img rounded-circle mr-2"
                            style={{
                              background: todo.user.userInfo.avatarColor,
                            }}
                          >
                            {todo.user.userInfo.name.substring(0, 2)}
                          </div>
                        ) : (
                          <img
                            src={todo.user.userInfo.avatar}
                            alt="user"
                            className="rounded-circle mr-2"
                            width="15"
                            height="15"
                          />
                        )}
                      </>

                      <p
                        style={{
                          fontSize: '10px',
                          margin: 0,
                          marginTop: '0.1rem',
                          fontWeight: '800',
                        }}
                        className={` ${
                          todo.done === false ? 'member-name' : ''
                        }`}
                      >
                        {todo.user.userInfo.name}
                      </p>
                    </div>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
  // </CardComponent>
};

CreateTodo.defaultProps = {
  closeModal: () => {},
};
CreateTodo.propTypes = {
  closeModal: PropTypes.func,
};
function mapStateToProps(state) {
  const { requests, projects, users } = state;
  return {
    requesting: requests.requesting,
    accountId: users.accountInfo.user.account.account,
    loggedInUserId: users.accountInfo.user._id,
    single_project: projects.single_project,
    project_todo: projects.project_todo,
  };
}
export default connect(mapStateToProps)(CreateTodo);
