import React, { useState, useRef, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SearchIcon from "zeedas-assets/icons/icon-search";
import TransactionBadge from "zeedas-components/transaction-badge";
import { projectService } from "services/projects-service";
import { Link } from "react-router-dom";
import AvatarSingle from 'zeedas-components/avatar-single';
import "./style.scss";

const paths  = {
  user:(id) => `/team-member-profile/${id}`,
  project:(id) => `/projects/${id}/overview`,
}

const SearchLayout = ({history}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [apps, setApps] = useState([]);

  const toggle = () => {
    if (!searchQuery.length) return;
    setDropdownOpen((prevState) => !prevState);
  };

  const handleRouting = (path) => {
    history.push(path);
    setSearchQuery("")
  }

  useEffect(() => {
    if (searchQuery.length) {
      setDropdownOpen(true);
      searchProject();
    } else {
      setDropdownOpen(false);
    }
  }, [searchQuery]);

  const handleChange = async (e) => {
    setSearchQuery(e.target.value);
  };

  const searchProject = () => {
    projectService.searchProject(searchQuery).then((response) => {
      const result = response.response.data;
      setProjects(result.project || []);
      setUsers(result.users || []);
      setModules(result.modules || []);
      setApps(result.apps || []);
    });
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="SearchLayout">
      <DropdownToggle nav caret>
        <div className="topbar-search">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {/* <i className="ti-search" /> */}
                <SearchIcon />
              </span>
            </div>
            <input
              value={searchQuery}
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Username"
              onChange={handleChange}
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu className="p-4">
        <h5 className="">Showing results that match "{searchQuery}"</h5>
        {users.length ? (
          <div className="py-3 border-bottom">
            <h6>Teams</h6>
            <div className="d-flex">
              {users.map(
                (user, index) =>
                  index < 4 && (
                    <div className="px-1 text-truncate">
                      <a
                        className="link-item d-flex align-items-center mr-1"
                        onClick={() => handleRouting(paths.user(user.userInfo._id))}
                        >
                        <AvatarSingle item={{user: user.userInfo}} className="user-avatar" />
                          <span className="ml-1 text-truncate">
                            {user.userInfo.name}
                          </span>
                      </a>
                    </div>
                  )
              )}
            </div>
          </div>
        ): <></>}
        {projects.length ?
          <div className="py-3 border-bottom">
            <h6>Projects</h6>
            <div className="d-flex">
              {projects.map((project) => (
                <div className="col-3 px-1 text-truncate">
                  <Link className="link-item" to={`/project/${project._id}`}>
                    {project.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        : <></>}
        {modules.length ? 
          <div>
            <h6>Modules</h6>
            <span className="mr-2 mb-2">
              <TransactionBadge
                status="Zeedas website"
                bgColor="rgba(3, 41, 61, 0.04)"
                color="rgba(3, 41, 61,0.7)"
              />
            </span>
            <span className="mr-2 mb-2">
              <TransactionBadge
                status="Zeedas website"
                bgColor="rgba(3, 41, 61, 0.04)"
                color="rgba(3, 41, 61,0.7)"
              />
            </span>
          </div>
        : <></>}
        {modules.length ? 

        <div>
          <h6>Task</h6>
          <p>Zeedas website</p>
        </div>
        : <></>}
      </DropdownMenu>
    </Dropdown>
  );
};

export default withRouter(SearchLayout);
