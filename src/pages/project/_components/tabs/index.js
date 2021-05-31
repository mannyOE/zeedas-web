import React, { useState, Children } from "react";
import { TabsWrapper, TabList, TabButton, TabContent } from "./style";

export const Tab = (props) => {
  const { children, TabListComponent, goTo, selectedPath } = props;
  const [selectedTab, setSelectedTab] = useState(selectedPath);

  const handleClick = (index, path) => {
    goTo(path);
    setSelectedTab(index);
  };

  return (
    <TabsWrapper>
      <TabList role="tablist">
        <div>
          {Children.map(children, ({ props: { label, path } }, index) => (
            <TabButton
              selected={selectedPath === path}
              onClick={() => handleClick(index, path)}
            >
              {label}
            </TabButton>
          ))}
        </div>
        {TabListComponent && <TabListComponent />}
      </TabList>
      <React.Fragment>
        {Children.map(children, (Component, index) =>
          selectedPath === Component.props.path ? Component : undefined
        )}
      </React.Fragment>
    </TabsWrapper>
  );
};

Tab.Panel = ({ children }) => (
  <TabContent role="tabpanel">{children}</TabContent>
);
