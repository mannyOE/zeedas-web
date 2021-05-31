import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import RoleList from '../role-list/index';
import ChipEntriesDisplay from '../chip-entries-display';
import IconSearchLight from '../../../../zeedas-assets/icons/icon-search-light';
import { APP_ROLES } from 'utils/constants';

const CoreTeamForm = ({
  setSelectedRole,
  roles,
  teamsList,
  currentCoreTeam,
}) => {
  const [searchTeam, setSearchTeam] = useState('');
  const [state, setState] = useState({
    isChecked: {},
    teams: [],
  });
  useEffect(() => {
    const result = teamsList.filter((o) =>
      o.user.name.toLowerCase().includes(searchTeam)
    );
    setState({ ...state, teams: result });
  }, [searchTeam]);

  const onChangeRole = (event, item) => {
    setState({
      ...state,
      isChecked: {
        ...state.isChecked,
        [event.target.name]: event.target.checked,
      },
    });
    setSelectedRole(event, item);
  };
  const handleChange = async (e) => {
    setSearchTeam(e.target.value);
  };
  const { isChecked, teams } = state;
  return (
    <div className="CoreTeamForm p-4">
      <div className="role-section project-members">
        <div className="CoreTeamForm__input-group mb-3 position-relative">
          <div
            className="position-absolute"
            style={{ left: '25px', top: '18px' }}
          >
            <IconSearchLight fill="#c4c4c4" />
          </div>
          <input
            type="search"
            className="CoreTeamForm__input w-100 pl-5 pr-4"
            placeholder="Search Team Member"
            value={searchTeam}
            name="search"
            onChange={handleChange}
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
        {teams.length > 0 ? (
          <RoleList
            roles={roles}
            id="team-"
            teamList={teams}
            name="core-team-role"
            onChangeRole={onChangeRole}
            isChecked={isChecked}
          />
        ) : (
          <>
            {searchTeam ? (
              <p className="text-center">No match found</p>
            ) : (
              <>
                <p className="text-center">Your team list is empty</p>
                <p className="text-center">
                  Looks like all team members have been assigned to this project
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function filterTeamList(currentProjectTeam, companyTeam) {
  const x = companyTeam.filter((tMember) => {
    const memberExists = currentProjectTeam.find(
      (cMember) => cMember._id == tMember._id
    );
    if (memberExists) return;
    if (
      tMember.roles.length === 2 &&
      tMember.roles.includes(APP_ROLES.ADMIN) &&
      tMember.roles.includes(APP_ROLES.OWNER)
    )
      return;
    if (
      tMember.roles.length === 1 &&
      (tMember.roles.includes(APP_ROLES.ADMIN) ||
        tMember.roles.includes(APP_ROLES.OWNER))
    )
      return;
    return tMember;
  });
  return x;
}

function mapStateToProps(state) {
  const { requests, users, projects } = state;
  const companyTeam = users.teamsList.coreTeam;
  const currentProjectTeam = projects.single_project.users;
  const teamsList = filterTeamList(currentProjectTeam, companyTeam);

  return {
    requesting: requests.requesting,
    teamsList,
  };
}
export default connect(mapStateToProps)(CoreTeamForm);
