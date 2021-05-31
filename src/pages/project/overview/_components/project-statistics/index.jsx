import React, { useState } from 'react';
import IconBag from 'zeedas-assets/icons/icon-bag';
import './style.scss';

const IconBagWrapped = () => (
  <div className="IconBag__wrapper">
    <IconBag />
  </div>
);

const ProjectStatisticsCard = ({
  cardLabelTop,
  cardLabelBottom,
  topLeft,
  topRight,
  className,
}) => (
  <div className="col-md-4 pb-3 px-2">
    <div
      className={`ProjectStatistics__card d-flex flex-column justify-content-between p-3 ${className}`}
    >
      <div className="d-flex align-items-center justify-content-between">
        {topLeft ? topLeft : <IconBagWrapped />}
        {topRight && <div>{topRight}</div>}
      </div>
      <div className="d-flex flex-column">
        <span className="font-10">{cardLabelTop} </span>
        <span className="font-12">{cardLabelBottom}</span>
      </div>
    </div>
  </div>
);

const ProjectStatistics = () => (
  <div className="ProjectStatistics">
    <div className="row" style={{ marginRight: '0.5rem', marginLeft: '-0.5rem' }}>
      <ProjectStatisticsCard
        className="c-yellow"
        cardLabelTop="Company"
        cardLabelBottom="Performance"
      />
      <ProjectStatisticsCard
        className="c-orange"
        topRight={<div className="font-14">14/06/2020</div>}
        cardLabelTop="Projected"
        cardLabelBottom="Delivery Date"
      />
      <ProjectStatisticsCard
        className="c-dark-blue"
        topRight={<div className="font-24">14</div>}
        cardLabelTop="Total"
        cardLabelBottom="Deadline Missed"
      />
      <ProjectStatisticsCard
        className="c-blue"
        topRight={<div className="font-16">$100</div>}
        cardLabelTop="Total"
        cardLabelBottom="Expenses So Far"
      />
      <ProjectStatisticsCard
        className="c-turquoise"
        topRight={<div className="font-16">$100</div>}
        cardLabelTop="Total"
        cardLabelBottom="Per Developer"
      />
      <ProjectStatisticsCard
        className="c-purple"
        topRight={<div className="font-16">$100</div>}
        cardLabelTop="Total"
        cardLabelBottom="Amount Saved"
      />
    </div>
  </div>
);

export default ProjectStatistics;
