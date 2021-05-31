import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  CardLayout, Layer, Title, DueDate,
} from "./style";
import { theme } from "../../style";
// import { ClockIcon } from '../../../../zeedas-assets/icons/icon-clock';
import { CardMenu } from "./card-menu";
import { Textarea } from "../form/textarea";
import { kanbanListSelector } from "../../../../state/redux/kanban-list/actions";
import {
  createModule,
  appSelector,
} from "../../../../state/redux/modules/actions";
import { ClockIcon } from "../../../../zeedas-assets/icons/icon-clock";

const iconProps = {
  dimension: {
    width: 12.8,
    height: 12.8,
  },
  color: theme.colors.gray600,
  strokeWidth: 1,

};

const convertDate = (date) => moment(date).format("DD MMM");

const Card = (props) => {
  const {
    task,
    edit,
    list,
    createModule,
    setAddCard,
    app,
    onClick,
    active,
    match,
    showMenu,
  } = props;
  const { dueDate } = task;
  const { params } = match;
  const [name, setName] = useState(task.name);
  const { _id } = task;

  const handleEnter = (value) => {
    const module = {
      project: params.projectId,
      name: value,
    };
    createModule(module);
    setName("");
  };

  return (
    <CardLayout edit={edit} onClick={onClick} active={active}>
      {edit ? (
        <Textarea
          handleChange={setName}
          value={name}
          handleEnter={handleEnter}
        />
      ) : (
        <>
          <Layer>
            <Title>{name}</Title>
            {showMenu && <CardMenu id={_id} />}
          </Layer>
          <Layer>
            {!edit && dueDate && (
              <DueDate>
                <ClockIcon {...iconProps} />
                {" "}
                Due
                {convertDate(dueDate)}
              </DueDate>
            )}
            <div />
          </Layer>
        </>
      )}
    </CardLayout>
  );
};

Card.propTypes = {
  edit: PropTypes.bool,
  task: PropTypes.shape({
    title: PropTypes.string,
    dueDate: PropTypes.string,
  }),
};

const mapStateToProps = (state, { listId }) => {
  const kanbanlist = kanbanListSelector(state);
  const app = appSelector(state);
  const list = kanbanlist.find((list) => list.droppableId === listId);
  return {
    list,
    app,
  };
};

export default connect(mapStateToProps, { createModule })(withRouter(Card));
