import React from "react";
import {
  Nav, NavLink, NavItem, TabContent, TabPane,
} from "reactstrap";
import classnames from "classnames";
import PropTypes from "prop-types";

class TabNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
    };
  }

  toggle(tabId) {
    if (this.state.activeTab !== tabId) {
      this.setState({
        activeTab: tabId,
      });
    }
  }

  render() {
    const {
      tabNavigationTitles,
      tabNavigationContents,
      titlesPosition,
      titleSize,
      titleStyles,
      navStyles,
      className,
      contentClass
    } = this.props;

    return (
      <div>
        <Nav
          tabs
          className={`${
            titlesPosition === "center" ? `justify-content-center ${className}` : `${className}`
          }`}
          style={{...navStyles}}
        >
          {tabNavigationTitles.map((item) => (
            <NavItem key={item.tabId} className="tab-title">
              <NavLink
                style={{ fontSize: titleSize, ...titleStyles }}
                disabled={item.disabled}
                onClick={() => this.toggle(item.tabId)}
                className={classnames({
                  active: this.state.activeTab === item.tabId,
                })}
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={this.state.activeTab} className={contentClass}>
          {tabNavigationContents.map((item) => (
            <TabPane tabId={item.contentId} key={item.contentId}>
              {item.content}
            </TabPane>
          ))}
        </TabContent>
      </div>
    );
  }
}

TabNavigation.propTypes = {
  tabNavigationTitles: PropTypes.array,
  tabNavigationContents: PropTypes.array,
  titlesPosition: PropTypes.string,
  titleSize: PropTypes.number,
  className: PropTypes.string,
  titleStyles: PropTypes.object,
  navStyles: PropTypes.object,
};

export default TabNavigation;
