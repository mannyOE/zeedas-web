import React, { useState, useEffect, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
  listModules,
  modulesSelector,
  deleteModule,
  updateModule,
} from "state/redux/modules/actions";
import { kanbanListSelector } from "state/redux/kanban-list/actions";
import ZeedasModal from "zeedas-components/modal";
import ZeedasFullModal from "zeedas-components/full-modal";
import { TrashIcon } from "zeedas-assets/icons/icon-trash";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import list from "state/redux/modules/list";
import {
  ModalContent,
  EmptyContentWrapper,
  ModalBody,
  Button,
  DeleteButton,
} from "./style";
import { Content, theme } from "../style";
import { KanbanList } from "./kanban-list";
import Planning from "./planning";
import ModuleForm from "./edit-form";
import ViewModule from "./view-module";
import Card from "../_components/card";
import { withDraggable, reorder, move } from "../_components/drag-and-drop";
import { ModalProvider, Modal } from "../_components/modal";
import { EmptyActivityImage } from "../_components/activity-image";
import {
  APP_ROLES,
  KANBAN_FILTER_TYPE,
  MODULE_STATUS,
} from "../../../utils/constants";
import { AppUtils } from "../../../utils/app-utils";
import CodeReview from "./code-review/index";
import ModuleCard from "./_components/module-card/index";
import ModuleCardDropdown from "./_components/module-card-dropdown";
import PageLoader from "../../../zeedas-components/page-loader";

import { configActions } from "../../../state/redux/config/actions";

import { firebaseActions } from "../../../services/firebase";

//
const [backlogData, assigned, inProgress, development, inReview] = list;

const structureModules = (modules, boards = []) => {
  const boardsWithTasks = boards.map((board) => ({ ...board, tasks: [] }));

  modules.forEach((moduleCard) => {
    const {
      status, _id, stage, state,
    } = moduleCard;
    // const index = boardsWithTasks.findIndex((board) => (
    //   !stage
    //     ? board.status === status
    //     : board.status === status && board.stage === stage),
    // );
    //
    // if (index > -1 && boardsWithTasks[index]) {
    //   boardsWithTasks[index].tasks.push({ ...moduleCard, taskId: _id });
    // }

    boardsWithTasks.forEach((taskBoard) => {
      if (
        (!stage && taskBoard.status === status)
        || (stage && taskBoard.status === status && taskBoard.stage === stage)
        // (!state && taskBoard.status === status)
        // || (state && taskBoard.status === status && taskBoard.state === state)
      ) {
        taskBoard.tasks.push({ ...moduleCard, taskId: _id });
      }
    });
  });

  return boardsWithTasks;
};

export const Module = (props) => {
  // const kanbanFilter = useSelector((state) => state.kanbanlist.kanbanFilter);
  const {
    currentUser,
    modules,
    kanbanList,
    kanbanFilter,
    deleteModule,
    listModules,
    notifications,
    $$resetCodeReview,
    match,
  } = props;

  const {
    projectId,
    moduleId: moduleIdParam,
    userRole: userRoleParam,
  } = match.params;

  const [
    backlog,
    assigned,
    planning,
    development,
    inReview,
    completed,
  ] = kanbanList;

  const [kanbanBoard, setKanbanBoard] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [showModalPM, setShowModalPM] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const [showEAModal, setShowEAModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState(null);
  const [editCardId, setEditCardId] = useState(null);

  const userIsPM = AppUtils.confirmCurrentUserProjectRole(
    APP_ROLES.PROJECT_MANAGER,
  );
  const userIsEA = AppUtils.confirmCurrentUserProjectRole(
    APP_ROLES.ENTERPRISE_ARCHITECT,
  );
  const userIsSD = AppUtils.confirmCurrentUserProjectRole(
    APP_ROLES.SOFTWARE_DEVELOPER,
  );

  const handleClick = (taskId, task) => {
    setEditCardId(taskId);
    setSelectedTask(task);

    if (task.status === backlogData.status) {
      // TODO: Make these checks even stricter - MEL
      // if ((userIsPM && !userIsEA) || userRoleParam === APP_ROLES.PROJECT_MANAGER) {
      if (userIsPM && userRoleParam === APP_ROLES.PROJECT_MANAGER) {
        setShowModalPM(true);
      } else if (userIsEA && userRoleParam === APP_ROLES.ENTERPRISE_ARCHITECT) {
        setShowEAModal(true);
      }
      // userIsPM ? setShowModalPM(true) : setShowEAModal(true);
    } else if (
      task.status === inProgress.status
      && ((userIsEA && userRoleParam === APP_ROLES.ENTERPRISE_ARCHITECT) || userIsSD)
    ) {
      setShowFullModal(true);
    } else {
      setShowEAModal(true);
    }

    const moduleNotifications = notifications.filter((notification) => (
      notification.module === taskId
    ));

    moduleNotifications.forEach((notification) => {
      const notificationPayload = { ...notification };
      delete notificationPayload.snapshotKey;
      firebaseActions.markNotificationAsSeen(currentUser._id, notification.snapshotKey, notificationPayload);
    });
  };

  const handleCloseCodeReview = () => {
    setShowFullModal(false);
    $$resetCodeReview();
  };

  const generateKanbanBoard = (
    data = [],
    setDeleteCardId,
    handleClick,
    setShowDeleteModal,
  ) => data.map((list) => {
    const { title, droppableId, tasks } = list;

    const cards = tasks.map((task) => {
      const { taskId } = task;
      const handleDelete = () => {
        setDeleteCardId(taskId);
        setShowDeleteModal(true);
      };

      const showNotification = title === planning.title
        || title === development.title
        || title === inReview.title;

      return (
        <ModuleCard
          key={taskId}
          module={task}
          className="mb-2"
          onClick={() => handleClick(taskId, task)}
          showNotification={showNotification}
          cardDropdown={(
            <ModuleCardDropdown
              handleEdit={() => handleClick(taskId, task)}
              handleDelete={handleDelete}
            />
            )}
        />
      );
    });

    const moduleFilters = kanbanFilter[title];
    /* Check if the module filters apply */

    const filteredCards = cards.filter((card) => {
      const { module } = card.props;
      const filterByApp = !moduleFilters.app.length || moduleFilters.app.includes(module.app);
      const filterByUser = !moduleFilters.user.length || moduleFilters.user.includes(module.sd);

      if (!filterByApp || !filterByUser) return false;
      return true;
    });

    return (
      <KanbanList
        cards={filteredCards}
        key={title}
        droppableId={droppableId}
        title={title}
      />
    );
  });

  const kanban = generateKanbanBoard(
    kanbanBoard,
    setDeleteCardId,
    handleClick,
    setShowDeleteModal,
  );

  const deleteCard = () => {
    deleteModule(deleteCardId);
    setShowDeleteModal(false);
  };

  const setupModal = (moduleId, setAsActiveModal) => {
    const selectedModule = modules.find((module) => module._id === moduleId);
    setEditCardId(moduleId);
    setSelectedTask(selectedModule);
    if (
      (selectedModule.status === planning.status && selectedModule.stage === planning.stage)
      || (selectedModule.status === development.status && selectedModule.stage === development.stage)
      || (selectedModule.status === inProgress.status)
    ) {
      setShowFullModal(true);
    } else {
      setAsActiveModal(true);
    }
  };

  useEffect(() => {
    if (userRoleParam && moduleIdParam) {
      const selectedModule = modules.find((module) => module._id === moduleIdParam);
      console.log("[SELECTED MODULE]:", selectedModule);
      handleClick(moduleIdParam, selectedModule);
      /* switch (userRoleParam) {
        case APP_ROLES.ENTERPRISE_ARCHITECT:
          setupModal(moduleIdParam, setShowEAModal);
          break;
        case APP_ROLES.PROJECT_MANAGER:
          setupModal(moduleIdParam, setShowModalPM);
          break;
        default:
          // setupModal(moduleIdParam, setShowFullModal);
          setupModal(moduleIdParam, setShowEAModal);
          break;
      } */
    }
  }, [userRoleParam, moduleIdParam]);

  useEffect(() => {
    if (modules && kanbanList.length) {
      setKanbanBoard(structureModules(modules, kanbanList));
    }
  }, [modules, kanbanList]);

  useEffect(() => {
    listModules(projectId);
  }, []);

  //
  if (!modules || !kanbanList) {
    return <PageLoader />;
  }

  return (
    <>
      {showFullModal && (
        <ZeedasFullModal
          open={showFullModal}
          hideCloseButton
          removeDefaultPadding
          width="100%"
        >
          {selectedTask.status === planning.status
            && selectedTask.stage === planning.stage && (
              <Planning
                task={selectedTask}
                onCloseModal={() => setShowFullModal(false)}
              />
          )}
          {selectedTask.status === development.status
            && selectedTask.stage === development.stage && (
              <CodeReview
                task={selectedTask}
                onCloseModal={handleCloseCodeReview}
              />
          )}
        </ZeedasFullModal>
      )}

      {showEAModal && (
        <ZeedasFullModal
          open={showEAModal}
          onClose={() => setShowEAModal(false)}
          removeDefaultPadding
          width={
            window.innerWidth >= 768
              ? "45%"
              : window.innerWidth < 600
                ? "100%"
                : "33%"
          }
        >
          <ViewModule id={editCardId} />
        </ZeedasFullModal>
      )}

      <div
        className="d-flex w-100 h-100"
        style={{ padding: "0 85px", overflowX: "auto" }}
      >
        <ModalProvider
          value={{
            setShowModalPM,
            setShowDeleteModal,
            setDeleteCardId,
            setEditCardId,
          }}
        >
          {kanban}
          <div
            style={{
              minWidth: "100px",
              maxWidth: "85px",
              visibility: "hidden",
            }}
          />
        </ModalProvider>
      </div>

      <Modal
        showModal={showModalPM}
        handleClose={() => setShowModalPM(false)}
      >
        <ModalContent>
          <ModuleForm id={editCardId} />

          <EmptyContentWrapper>
            <EmptyActivityImage />
            <p>You do not have any</p>
            <p>project activity</p>
          </EmptyContentWrapper>
        </ModalContent>
      </Modal>

      <ZeedasModal
        onClose={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        title="Delete Module"
      >
        <ModalBody>
          <h4>Do you still want to delete it?</h4>
          <p>
            This module will be permanently deleted from zeedas, and this action
            can not be undone.
          </p>
          <div>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <DeleteButton onClick={deleteCard}>
              <TrashIcon
                color={theme.colors.white}
                dimension={{ height: 14, width: 14 }}
              />
              Delete
            </DeleteButton>
          </div>
        </ModalBody>
      </ZeedasModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  // modules: modulesSelector(state),
  // kanbanList: kanbanListSelector(state),
  currentUser: state.auth.userData,
  modules: state.modules.module,
  kanbanList: state.kanbanlist.kanbanList,
  kanbanFilter: state.kanbanlist.kanbanFilter,
  notifications: state.notification.allNotifications,
});

const mapDispatch = {
  deleteModule,
  listModules,
  updateModule,
  $$resetCodeReview: configActions.resetCodeReview,
};

export default connect(mapStateToProps, mapDispatch)(withRouter(Module));
