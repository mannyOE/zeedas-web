import React, { useState } from "react";
import "./style.scss";
import { Dropdown, DropdownToggle, DropdownMenu, Progress } from "reactstrap";
import { AppUtils } from "utils/app-utils";
import { APP_ROLES } from "utils/constants";
import { withRouter } from "react-router-dom";
import AvatarSingle from "zeedas-components/avatar-single";
import { useSelector } from "react-redux";
import colors from "utils/colors";

const ProjectDetailsCard = ({}) => {
  return (
    <div className="ProjectDetails p-4">
      <div className="ProjectDetails__stats">
        <div className="ProjectDetails__stats-item d-flex align-items-center">
          <div className="value bg-blue">30</div>
          <div className="label ml-2">Total number of tasks</div>
        </div>
        <div className="ProjectDetails__stats-item d-flex align-items-center">
          <div className="value bg-yellow">30</div>
          <div className="label ml-2">Task in progress</div>
        </div>
        <div className="ProjectDetails__stats-item d-flex align-items-center">
          <div className="value bg-green">30</div>
          <div className="label ml-2">Task completed</div>
        </div>
      </div>
      <hr />
      <div className="ProjectDetails__info">
        <div className="ProjectDetails__info-item">
          <div className="label mb-1 ">Project Progress</div>
          <div className="d-flex align-items-center">
            <progress
              id="progress"
              class="d-block w-100"
              value={25}
              max="100"
            />

            <span className="ml-4 font-weight-bold font-10 fc-orange">25%</span>
          </div>
        </div>
        <div className="ProjectDetails__info-item">
          <div className="label mb-1 fc-green">Project Delivery Date</div>
          <div className="value fc-green">
            {" "}
            <span>10/June/2020</span>{" "}
            <span className="mr-3 font-10 font-weight-light">On track</span>
          </div>
        </div>
        <div className="ProjectDetails__info-item">
          <div className="label mb-1">Calculated Delivery Date</div>
          <div className="value">24th/ June / 2020</div>
        </div>
        <div className="d-flex align-items-center font-10">
          <span>Want to get back on track?</span>
          <a href="#" className="ml-2">
            view suggestions
          </a>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProjectDetailsCard);
