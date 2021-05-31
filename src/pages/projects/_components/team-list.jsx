import React from "react";
import PropTypes from "prop-types";
import RadioButton from "../../../zeedas-components/radio-button";
import { AppUtils } from "utils/app-utils";
const TeamList = ({ onChangeRadioButton, checkedItem, id, team }) => {
  return (
    <div className="team-list">
      <div>
        {team.user.avatar === "" ? (
          <div
            className="team-default-img"
            style={{ background: team.user.avatarColor }}
          >
            {team.user.name.substring(0, 2)}
          </div>
        ) : (
          <img className="team-img" src={team.user.avatar} alt="" />
        )}
      </div>
      <div className="team-list-content ">
        <div style={{ width: "100%" }}>
          <h5>{team.user.name}</h5>
          <p>{team.user.email}</p>
        </div>
        <h6>{AppUtils.interpretRole(team.roles[0])}</h6>
        <RadioButton
          onChange={onChangeRadioButton}
          checked={checkedItem}
          name="team"
          id={id}
        />
      </div>
    </div>
  );
};

export default TeamList;
TeamList.defaultProps = {
  onChangeRadioButton: () => {},
  checkedItem: false,
  team: "",
  id: "",
};

TeamList.propTypes = {
  team: PropTypes.object,
  onChangeRadioButton: PropTypes.func,
  checkedItem: PropTypes.bool,
  id: PropTypes.string,
};
