import React, { useState, useEffect, useRef } from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { APP_ROLES, KANBAN_FILTER_TYPE } from "utils/constants";
import { Dropdown, DropdownToggle } from "reactstrap";
import { addKanbanFilter, removeKanbanFilter } from "state/redux/kanban-list/actions";
import KanbanFilter from "../filter/index";
import PlusIcon from "../../../../zeedas-assets/icons/icon-plus";
import { theme } from "../../style";
import {
  List, ListBody, ListHeader, AddCard, Input,
} from "./style";

const { colors } = theme;

export const CardList = (props) => {
  const kanbanFilter = useSelector((state) => state.kanbanlist.kanbanFilter);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const {
    children,
    title,
    empty,
    setAddCard,
    iconMenu,
    editName,
  } = props;

  const [name, setName] = useState(title);
  const [showAddCard, setShowAddCard] = useState(false);
  const [userFilter, setUserFilter] = useState(
    kanbanFilter[name].user ? kanbanFilter[name].user : [],
  );
  const [appFilter, setAppFilter] = useState(
    kanbanFilter[name].app ? kanbanFilter[name].app : [],
  );

  const handleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  const addAppFilter = (appId) => {
    dispatch(addKanbanFilter(name, KANBAN_FILTER_TYPE.app, appId));
  };
  const addUserFilter = (userId) => {
    dispatch(addKanbanFilter(name, KANBAN_FILTER_TYPE.user, userId));
  };
  const removeUserFilter = (userId) => {
    dispatch(removeKanbanFilter(name, KANBAN_FILTER_TYPE.user, userId));
  };
  const removeAppFilter = (appId) => {
    dispatch(removeKanbanFilter(name, KANBAN_FILTER_TYPE.app, appId));
  };

  const isProjectManager = users.accountInfo.membershipInfo.roles[0] === APP_ROLES.PROJECT_MANAGER;
  const userIsEA = users.accountInfo.membershipInfo.roles[0] === APP_ROLES.ENTERPRISE_ARCHITECT;

  useEffect(() => {
    // setAddCard && setAddCard(showAddCard);
    if (setAddCard) setAddCard(showAddCard);
  }, [showAddCard]);

  return (
    <List>
      <ListHeader>
        {editName ? (
          <Input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        ) : (
          <div className="d-flex mb-3 justify-content-between align-items-center w-100">
            <h3 className=" font-14">{ userIsEA && name === "Backlog" ? "Module" : name }</h3>
            <KanbanFilter
              appFilter={appFilter}
              userFilter={userFilter}
              addAppFilter={(id) => addAppFilter(id)}
              addUserFilter={(id) => addUserFilter(id)}
              removeAppFilter={(id) => removeAppFilter(id)}
              removeUserFilter={(id) => removeUserFilter(id)}
            />
          </div>
        )}
        {iconMenu}
      </ListHeader>
      {setAddCard && isProjectManager && (
        <AddCard onClick={handleAddCard}>
          <PlusIcon stroke={colors.$zdBlue} />
        </AddCard>
      )}
      <ListBody empty={empty}>
        { children }
      </ListBody>
    </List>
  );
};

export default CardList;

CardList.Body = styled.div`
  width: 100%;
  height: 100%;
`;

CardList.propTypes = {
  title: Proptypes.string,
  empty: Proptypes.bool,
  addCard: Proptypes.func,
  children: Proptypes.element,
};
