import React from 'react';
import IconCheckThick from 'zeedas-assets/icons/icon-check-thick';
import IconConnect from 'zeedas-assets/icons/icon-connect';
import IconSadEmoji from 'zeedas-assets/icons/icon-sad-emoji';
import IconTrendThick from 'zeedas-assets/icons/icon-trend-thick';
import './style.scss';

const OverviewStatisticsItem = ({ count, label, icon, className }) => (
  <div
    className={`OverviewStatisticsItem d-flex align-items-center justify-content-center ${className}`}
  >
    <div className="item-icon">{icon}</div>
    <div className="d-flex align-items-baseline justify-content-center">
      <div className="item-count ml-3 mr-2">{count}</div>
      <div className="item-label">{label}</div>
    </div>
  </div>
);

const OverviewStatistics = () => (
  <div className="OverviewStatistics p-4">
    <div className="row no-gutters">
      <div className="col-md-3">
        <OverviewStatisticsItem
          icon={<IconConnect />}
          count="25"
          label="Total projects"
          className="border-right"
        />
      </div>
      <div className="col-md-3">
        <OverviewStatisticsItem
          icon={<IconCheckThick />}
          count="25"
          label="Completed projects"
          className="border-right"
        />
      </div>
      <div className="col-md-3">
        <OverviewStatisticsItem
          icon={<IconTrendThick />}
          count="25"
          label="In Progress"
          className="border-right"
        />
      </div>
      <div className="col-md-3">
        <OverviewStatisticsItem
          icon={<IconSadEmoji />}
          count="25"
          label="Out of schedule"
        />
      </div>
    </div>
  </div>
);

export default OverviewStatistics;
