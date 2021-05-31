import React from "react";
import PropTypes from "prop-types";
import RadioButton from "../../../../zeedas-components/radio-button";
const TeamList = ({ onChangeRadioButton, checkedItem, id, team }) => {
  return (
    <div>
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
          <div>
            <h5>{team.user.name}</h5>
            <p>{team.user.email}</p>
          </div>
          <h6>{team.roles[0]}</h6>
          <RadioButton
            onChange={onChangeRadioButton}
            checked={checkedItem}
            name="team"
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamList;
TeamList.defaultProps = {
  onChangeRadioButton: () => {},
  checkedItem: "",
  team: "",
  id: "",
};

TeamList.propTypes = {
  team: PropTypes.object,
  onChangeRadioButton: PropTypes.func,
  checkedItem: PropTypes.string,
  id: PropTypes.string,
};
