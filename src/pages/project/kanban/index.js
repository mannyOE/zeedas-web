import React from "react";
import { Container as Floating, Button } from "react-floating-action-button";
import { connect } from "react-redux";
import { Container } from "./style";
import Modules from "../modules";
import IconPlus from "../../../zeedas-assets/icons/icon-plus";
import colors from "../../../utils/colors";
import { createKanbanList } from "../../../state/redux/kanban-list/actions";

export const KanbanBoard = (props) => {
  const { createKanbanList } = props;

  const createList = () => {
    createKanbanList();
  };

  return (
    <div className="h-100">
      <Modules />
      {/* <Floating>
        <Button
          className="fab-item btn btn-link btn-lg text-white"
          styles={{ backgroundColor: colors.ZEEDAS_BLUE }}
          onClick={createList}
        >
          <IconPlus />
        </Button>
      </Floating> */}
    </div>
  );
};

export default connect(null, { createKanbanList })(KanbanBoard);
