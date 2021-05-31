import React, { useState } from 'react';
import IconBag from 'zeedas-assets/icons/icon-bag';
import ProjectTeamPerformance from './_components/project-team-performance/index';
import ProjectStatistics from './_components/project-statistics/index';
import ProjectPerformanceSummary from './_components/project-performance-summary';

import './style.scss';

const ProjectOverview = () => {
  return (
    <div className="ProjectOverview mt-4">
      <div className="row">
        <div className="col-md-6">
          <ProjectStatistics />
          <div className="ProjectOverview__card mt-4 mr-3">
            <ProjectPerformanceSummary />
          </div>
        </div>
        <div className="col-md-6">
          <div className="ProjectOverview__card h-100">
            <ProjectTeamPerformance />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
