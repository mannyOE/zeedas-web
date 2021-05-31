import React, { useState } from "react";
import CardList from "../../../_components/list/index";
import { ModalProvider } from "../../../_components/modal";
import { MenuItem } from "../style";
import { theme } from "../../../style";
import { EllipsisHorizontalIcon } from "../../../../../zeedas-assets/icons/icon-ellipsis-horizontal";
import { TickIcon } from "../../../../../zeedas-assets/icons/icon-tick";
import Card from "../../../_components/card/index";
import IconMenu from "../../../_components/icon-menu/index";

const iconProps = {
  dimension: {
    width: 18,
    height: 18,
  },
  color: theme.colors.black,
};
const list = [
  {
    title: "Has Test",
    value: "has-test",
  },
  {
    title: "No Test",
    value: "no-test",
  },
  {
    title: "QA Review",
    value: "qa-review",
  },
];
const ListDropDown = (props) => {
  const { handleSelect, selectedItems } = props;

  const select = (item) => {
    if (selectedItems.includes(item)) {
      handleSelect(selectedItems.filter((datum) => datum !== item));
    } else {
      handleSelect([...selectedItems, item]);
    }
  };
  return (
    <IconMenu title={<EllipsisHorizontalIcon {...iconProps} />}>
      {list.map(({ title, value }) => (
        <MenuItem onClick={() => select(value)} key={value} space={true}>
          {title} {selectedItems.includes(value) && <TickIcon />}
        </MenuItem>
      ))}
    </IconMenu>
  );
};

export const ListTestModules = (props) => {
  const { modules, activeModuleId, setActiveModule } = props;
  const [selectedItems, setSelectedItems] = useState([]);

  

  const generateCards = (data) => {
    return data.map((task) => {
      return (
        <Card
          task={task}
          key={task._id}
          active={activeModuleId === task._id}
          onClick={() => setActiveModule(task._id)}
        />
      );
    });
  };

  const filterModules = (modules) => {
    if (selectedItems.length > 0) {
      return modules.filter((module) => selectedItems.includes(module.state));
    }
    return modules;
  };
  const cards = generateCards(filterModules(modules));

  return (
    <CardList
      title="Modules"
      empty={!modules.length}
      iconMenu={
        <ListDropDown
          selectedItems={selectedItems}
          handleSelect={setSelectedItems}
        />
      }
    >
      <ModalProvider
        value={{ setShowModal: () => null, setShowDeleteModal: null }}
      >
        {cards}
      </ModalProvider>
    </CardList>
  );
};
