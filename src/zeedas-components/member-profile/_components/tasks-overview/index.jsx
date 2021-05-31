import React from 'react';
import "./style.scss";
import { Progress } from 'reactstrap';
import CardComponent from 'zeedas-components/card';
import ZeedasBadge from 'zeedas-components/badge';
import colors from 'utils/colors';
import BellIcon from 'zeedas-assets/icons/icon-bell';
import PropTypes from 'prop-types';

const TasksOverview = ({ className }) => (
  <div className={`overview-container ${className}`}>
    <CardComponent marginBottom="0" className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <ZeedasBadge
            color={colors.ZEEDAS_TEXAS_ROSE}
            backgroundColor={colors.ZEEDAS_FADED_TEXAS_ROSE}
          >
            In Progress
          </ZeedasBadge>
        </div>
        <Progress
          className="font-12 font-bold"
          style={{
            height: '40px',
            backgroundColor: colors.ZEEDAS_LIGHTER_GREY,
            color: colors.ZEEDAS_LIGHT_BLUE,
            boxShadow: 'none',
            borderRadius: '5px',
          }}
          color="zd-faded-white"
          value="50"
        >
          <span
            className="m-2 d-flex align-items-center"
            style={{ color: colors.ZEEDAS_FADED_EBONY }}
          >
            <BellIcon />
            <span className="mx-2">Deadline: October, 23</span>
          </span>
        </Progress>
      </div>

      <h2 className="mt-4 overview-title">
        Prepare Moodboard for website branding
      </h2>
      <p className="overview-description m-0">
        Search for the multicoloured background for supermassive black hole
        project. final CTA block need Improvements
      </p>
    </CardComponent>
  </div>
);

TasksOverview.defaultProps = {
  className: '',
};

TasksOverview.propTypes = {
  className: PropTypes.string,
};

export default TasksOverview;
